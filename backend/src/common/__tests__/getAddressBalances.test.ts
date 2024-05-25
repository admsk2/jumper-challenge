import { vi } from 'vitest';

import { getERC20Tokens } from '@/common/utils/getAddressBalances';
import { TokenData } from '@/types/tokenTypes';

describe('Get Address Balances', () => {
  it('retrieves TokenData', async () => {
    const mockAddress = '0x123';
    const mockNetwork = 'mainnet';
    const mockTokensData: TokenData[] = [
      {
        name: 'test',
        symbol: 'TST',
        balance: 100,
      },
    ];

    const mockGetERC20Tokens = vi.fn(getERC20Tokens).mockResolvedValue(mockTokensData);
    const tokensData: TokenData[] = await mockGetERC20Tokens(mockAddress, mockNetwork);

    expect(tokensData).toEqual(mockTokensData);
    expect(mockGetERC20Tokens).toHaveBeenCalledWith(mockAddress, mockNetwork);
  });
});
