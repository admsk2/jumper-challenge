import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Verify Signature API endpoints', () => {
  it('POST /verify - error', async () => {
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
