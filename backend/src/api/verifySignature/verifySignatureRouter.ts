import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SiweMessage } from 'siwe';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const verifySignatureRegistry = new OpenAPIRegistry();

export const verifySignatureRouter: Router = (() => {
  const router = express.Router();

  verifySignatureRegistry.registerPath({
    method: 'post',
    path: '/verify',
    tags: ['Verify Signature'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              signature: { type: 'string' },
            },
            required: ['address'],
          },
        },
      },
    },
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.post('/', async (req: Request, res: Response) => {
    try {
      const { message, signature }: { message: string; signature: string } = req.body;
      const siweMessage = new SiweMessage(message);
      const fields = await siweMessage.verify({ signature });

      if (fields.data.nonce !== (req.session as any).nonce) {
        const serviceResponse = new ServiceResponse<null>(
          ResponseStatus.Failed,
          'Error verifying signature',
          null,
          StatusCodes.UNPROCESSABLE_ENTITY
        );
        handleServiceResponse(serviceResponse, res);
        return;
      }

      (req.session as any).siwe = fields;
      req.session.save();

      const serviceResponse = new ServiceResponse<null>(
        ResponseStatus.Success,
        'Signature verified successfully',
        null,
        StatusCodes.OK
      );
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMsg = (error as any).message;
      const serviceResponse = new ServiceResponse<string>(
        ResponseStatus.Failed,
        'Signature verification error',
        errorMsg,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
