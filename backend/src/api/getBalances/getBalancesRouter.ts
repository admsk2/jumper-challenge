import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { isValidEthereumAddress } from '@/common/utils/commonValidation';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const getBalancesRegistry = new OpenAPIRegistry();

export const getBalancesRouter: Router = (() => {
  const router = express.Router();

  getBalancesRegistry.registerPath({
    method: 'post',
    path: '/balances',
    tags: ['Get Address Balances'],
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/', (req: Request, res: Response) => {
    try {
      const { address } = req.body;
      const isValidAddress = isValidEthereumAddress(address);
      if (!isValidAddress) {
        const serviceResponse = new ServiceResponse<string>(
          ResponseStatus.Failed,
          'Invalid ethereum address',
          address,
          StatusCodes.BAD_REQUEST
        );
        handleServiceResponse(serviceResponse, res);
      }

      // fetch tokens balances

      const tokenBalances = {};

      const serviceResponse = new ServiceResponse<any>(
        ResponseStatus.Success,
        'Token balances retrieved successfully',
        tokenBalances,
        StatusCodes.OK
      );
      handleServiceResponse(serviceResponse, res);
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
