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