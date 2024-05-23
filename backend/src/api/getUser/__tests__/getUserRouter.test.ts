import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Get User API endpoints', () => {
  it('GET / - not found', async () => {
    const response = await request(app).get('/user');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(result.success).toBeFalsy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('User not found');
  });
});
