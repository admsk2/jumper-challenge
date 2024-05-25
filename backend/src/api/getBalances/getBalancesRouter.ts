import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { isValidEthereumAddress } from '@/common/utils/commonValidation';
import { getERC20Tokens } from '@/common/utils/getAddressBalances';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { TokenData } from '@/types/tokenTypes';

export const getBalancesRegistry = new OpenAPIRegistry();

export const getBalancesRouter: Router = (() => {
  const router = express.Router();

  getBalancesRegistry.registerPath({
    method: 'get',
    path: '/balances',
    tags: ['Get Address Balances'],
    responses: createApiResponse(z.null(), 'Success'),
  });

  router.get('/:address', async (req: Request, res: Response) => {
    try {
      const { address } = req.params;
      const isValidAddress = isValidEthereumAddress(address);
      if (!isValidAddress) {
        const serviceResponse = new ServiceResponse<string>(
          ResponseStatus.Failed,
          'Invalid ethereum address',
          address,
          StatusCodes.BAD_REQUEST
        );
        handleServiceResponse(serviceResponse, res);
        return;
      }

      // fetch tokens balances
      const tokensData: TokenData[] = await getERC20Tokens(address, 'mainnet');

      const serviceResponse = new ServiceResponse<string>(
        ResponseStatus.Success,
        'Token balances retrieved successfully',
        JSON.stringify(tokensData),
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
