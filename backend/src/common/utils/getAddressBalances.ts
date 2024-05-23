import axios from 'axios';
import { ethers } from 'ethers';

const ETHERSCAN_API_KEY = 'your_etherscan_api_key';
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';

/**
 * Retrieves a list of ERC-20 tokens for a given address on a specified chain.
 * @param address - The address to query.
 * @param chain - The Ethereum chain (mainnet, ropsten, etc.).
 * @returns A promise that resolves to an array of token details.
 */
export async function getERC20Tokens(address: string, chain: string): Promise<any[]> {
  const provider = ethers.getDefaultProvider(chain);

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
  const tokenDetailsPromises = tokenContracts.map(async (contractAddress) => {
    const contract = new ethers.Contract(
      contractAddress as any,
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

    return {
      contractAddress,
      name,
      symbol,
      decimals,
      balance: (ethers as any).utils.formatUnits(balance, decimals),
    };
  });

  return Promise.all(tokenDetailsPromises);
}
