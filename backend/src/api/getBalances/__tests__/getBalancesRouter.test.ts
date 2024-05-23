import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Get Balances API endpoints', () => {
  it('POST /balances - error', async () => {
    const postData = {
      message: 'Test message',
      signature: 'Test signature',
    };

    const response = await request(app).post('/verify').send(postData);

    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.success).toBeFalsy();
    expect(result.responseObject).toBeTypeOf('string');
    expect(result.message).toEqual('Signature verification error');
  });
});
