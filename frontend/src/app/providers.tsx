"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/config";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
    const initialState = cookieToInitialState(config, cookie);
    return (
    <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
                modalSize="compact"
                initialChain={5}
            >
                {children}
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
    );
}