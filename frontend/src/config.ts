'use client';

// web3 imports
import { http, createStorage, cookieStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// config
const projectId = 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
    appName: 'Jumper Challenge',
    projectId,
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