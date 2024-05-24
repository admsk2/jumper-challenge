import axios from 'axios';
import { ethers } from 'ethers';

import { env } from '@/common/utils/envConfig';
import { TokenData } from '@/types/TokenTypes';

const ETHERSCAN_API_KEY = env.ETHERSCAN_API;
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';
/**
 * Retrieves a list of ERC-20 tokens for a given address on a specified chain.
 * @param address - The address to query.
 * @param chain - The Ethereum chain (mainnet, ropsten, etc.).
 * @returns A promise that resolves to an array of token details.
 */
export async function getERC20Tokens(address: string, chain: string): Promise<TokenData[]> {
  const provider: ethers.AbstractProvider = ethers.getDefaultProvider(chain);

  // Fetch token balances from Etherscan API
  const response = await axios.get(ETHERSCAN_BASE_URL, {
    params: {
      module: 'account',
      action: 'tokentx',
      address: address,
      startblock: 0,
      endblock: 'latest',
      sort: 'asc',
      apiKey: ETHERSCAN_API_KEY,
    },
  });

  if (response.data.status !== '1') {
    throw new Error('Error fetching token transactions from Etherscan');
  }

  const tokenTransactions = response.data.result;

  // Extract unique token contracts
  const tokenContracts = [...new Set(tokenTransactions.map((tx: any) => tx.contractAddress))];

  // Fetch token details
  const tokenDetailsPromises = tokenContracts.map(async (contractAddress): Promise<TokenData | null> => {
    const contract: ethers.Contract = new ethers.Contract(
      contractAddress as string,
      [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function balanceOf(address owner) view returns (uint256)',
      ],
      provider
    );

    const [name, symbol, decimals, balance] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.balanceOf(address),
    ]);

    const formattedBalance: string = (ethers as any).formatUnits(balance, decimals);

    // either string comparison or parseFloat
    if (formattedBalance === '0.0') {
      return null;
    }

    // return TokenData object
    return {
      name,
      symbol,
      balance: (ethers as any).formatUnits(balance, decimals),
    };
  });

  const tokensListRaw: (TokenData | null)[] = await Promise.all(tokenDetailsPromises);
  const tokensList: TokenData[] = tokensListRaw.filter((token): token is TokenData => token !== null);

  return tokensList;
}
