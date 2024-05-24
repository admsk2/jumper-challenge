import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { generateNonceRegistry } from '@/api/generateNonce/generateNonceRouter';
import { getBalancesRegistry } from '@/api/getBalances/getBalancesRouter';
import { getUserRegistry } from '@/api/getUser/getUserRouter';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';
import { logoutRegistry } from '@/api/logout/logoutRouter';
import { verifySignatureRegistry } from '@/api/verifySignature/verifySignatureRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    generateNonceRegistry,
    getBalancesRegistry,
    getUserRegistry,
    logoutRegistry,
    verifySignatureRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
