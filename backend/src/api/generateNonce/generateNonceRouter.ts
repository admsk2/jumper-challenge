import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateNonce } from 'siwe';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const generateNonceRegistry = new OpenAPIRegistry();

export const generateNonceRouter: Router = (() => {
  const router = express.Router();

  generateNonceRegistry.registerPath({
    method: 'get',
    path: '/nonce',
    tags: ['Generate Nonce'],
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', (req: Request, res: Response) => {
    (req.session as any).nonce = generateNonce();
    req.session.save();

    const serviceResponse = new ServiceResponse<string>(
      ResponseStatus.Success,
      'Nonce generated successfully',
      (req.session as any).nonce,
      StatusCodes.OK
    );
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
