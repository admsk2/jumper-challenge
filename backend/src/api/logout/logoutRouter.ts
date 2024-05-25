import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const logoutRegistry = new OpenAPIRegistry();

export const logoutRouter: Router = (() => {
  const router = express.Router();

  logoutRegistry.registerPath({
    method: 'get',
    path: '/logout',
    tags: ['Logout'],
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', (req: Request, res: Response) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw err;
        }
        const serviceResponse = new ServiceResponse<null>(
          ResponseStatus.Success,
          'User logged out successfully',
          null,
          StatusCodes.OK
        );
        handleServiceResponse(serviceResponse, res);
      });
    } catch (error) {
      const errorMsg = (error as any).message;
      const serviceResponse = new ServiceResponse<string>(
        ResponseStatus.Failed,
        'Error logging out user',
        errorMsg,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
