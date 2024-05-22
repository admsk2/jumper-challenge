'use client';
import { http, createStorage, createConfig, cookieStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

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