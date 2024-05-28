// import session from 'express-session';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

// // Create a mock function for staticMock
// const staticMock = vi.fn();

// staticMock.mockImplementation(() => (req: any, res: any, next: any) => {
//   req.session = { nonce: 'test' };
//   next();
// });

// // Spy on the session middleware and use the mock implementation
// vi.spyOn(session, 'Cookie').mockImplementation(staticMock);

describe('Verify Signature API endpoints', () => {
  // it('POST /verify - success', async () => {
  //   const postData = {
  //     message: 'Test message',
  //     signature: 'Test signature',
  //   };

  //   const response = await request(app).post('/verify').send(postData);

  //   const result: ServiceResponse = response.body;

  //   expect(response.statusCode).toEqual(StatusCodes.OK);
  //   expect(result.success).toBeTruthy();
  //   expect(result.responseObject).toBeNull();
  //   expect(result.message).toEqual('Signature verified successfully');
  // });
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
