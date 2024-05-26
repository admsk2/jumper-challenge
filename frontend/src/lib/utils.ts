// Function to format Ethereum address
// @param {string} address - Ethereum address
// @returns {string} - Formatted Ethereum address

export function formatEthereumAddress(address: string): string {
  if (address.length !== 42 || !address.startsWith('0x')) {
      throw new Error('Invalid Ethereum address');
  }

  const start = address.slice(0, 7);
  const end = address.slice(-5);
  return `${start}...${end}`;
}

// Function to round a number to four decimal places
// @param {number} num - Number to round
// @returns {number} - Number rounded to four decimal places

export function roundToFourDecimals(num: number): number {
  return Math.round(num * 10000) / 10000;
}
