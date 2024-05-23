import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  // ... other common validations
};

/**
 * Validates an Ethereum address.
 * @param address - The Ethereum address to validate.
 * @returns True if the address is valid, false otherwise.
 */

export function isValidEthereumAddress(address: string): boolean {
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return false;
  }

  if (/^0x[0-9a-f]{40}$/.test(address) || /^0x[0-9A-F]{40}$/.test(address)) {
    return true; // All lowercase or all uppercase addresses are valid.
  }

  return true;
};
