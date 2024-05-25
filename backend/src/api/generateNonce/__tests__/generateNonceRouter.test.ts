import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Generate Nonce API endpoints', () => {
  it('GET /nonce - success', async () => {
    const response = await request(app).get('/nonce');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeTypeOf('string');
    expect(result.responseObject).toHaveLength(17);
    expect(result.message).toEqual('Nonce generated successfully');
  });
});
