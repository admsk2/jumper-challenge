import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const getUserRegistry = new OpenAPIRegistry();

export const getUserRouter: Router = (() => {
  const router = express.Router();

  getUserRegistry.registerPath({
    method: 'get',
    path: '/user',
    tags: ['Get User'],
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', (req: Request, res: Response) => {
    try {
      const address: string = (req.session as any).siwe?.data.address;
      if (address) {
        const serviceResponse = new ServiceResponse<string>(
          ResponseStatus.Success,
          'User retrieved successfully',
          address,
          StatusCodes.OK
        );
        handleServiceResponse(serviceResponse, res);
      } else {
        const serviceResponse = new ServiceResponse<null>(
          ResponseStatus.Failed,
          'User not found',
          null,
          StatusCodes.NOT_FOUND
        );
        handleServiceResponse(serviceResponse, res);
      }
    } catch (error) {
      const errorMsg = (error as any).message;
      const serviceResponse = new ServiceResponse<string>(
        ResponseStatus.Failed,
        'Error retrieving user',
        errorMsg,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
