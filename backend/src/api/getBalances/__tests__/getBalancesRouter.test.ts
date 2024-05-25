import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { getERC20Tokens } from '@/common/utils/getAddressBalances';
import { app } from '@/server';
import { TokenData } from '@/types/tokenTypes';

describe('Get Balances API endpoints', () => {
  it('GET /balances/:address - success', async () => {
    const mockTokensData: TokenData[] = [
      {
        name: 'test',
        symbol: 'TST',
        balance: 100,
      },
    ];

    vi.mock('@/common/utils/getAddressBalances');
    vi.mocked(getERC20Tokens).mockReturnValue(Promise.resolve(mockTokensData));

    const response = await request(app).get('/balances/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toEqual(JSON.stringify(mockTokensData));
    expect(result.message).toEqual('Token balances retrieved successfully');
  });
  it('GET /balances/:address - error', async () => {
    const response = await request(app).get('/balances/0x');

    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.success).toBeFalsy();
    expect(result.responseObject).toBeTypeOf('string');
    expect(result.message).toEqual('Invalid ethereum address');
  });
});
