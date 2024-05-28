// import session from 'express-session';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

// // Create a mock function for staticMock
// const staticMock = vi.fn();

// staticMock.mockImplementation(() => (req: any, res: any, next: any) => {
//   req.session = { siwe: { data: { address: 'test' } } };
//   next();
// });

// // Spy on the session middleware and use the mock implementation
// vi.spyOn(session, 'Cookie').mockImplementation(staticMock);

describe('Get User API endpoints', () => {
  // it('GET / - found', async () => {
  //   const response = await request(app).get('/user');
  //   const result: ServiceResponse = response.body;

  //   expect(response.statusCode).toEqual(StatusCodes.OK);
  //   expect(result.success).toBeTruthy();
  //   expect(result.responseObject).toBeTypeOf('string');
  //   expect(result.message).toEqual('User retrieved successfully');
  // });
  it('GET / - not found', async () => {
    const response = await request(app).get('/user');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(result.success).toBeFalsy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('User not found');
  });
});
