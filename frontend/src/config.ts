'use client';
import { http, createStorage, createConfig, cookieStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
   }),
  transports: {
    [mainnet.id]: http('https://rpc.ankr.com/eth'),
    [sepolia.id]: http('https://rpc.ankr.com/eth_sepolia'),
  },
})