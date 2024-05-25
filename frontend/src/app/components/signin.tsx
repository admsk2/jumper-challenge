"use client";

// next imports
import { useState, useEffect } from "react";

// web3 imports
import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from 'siwe'

// ui components
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function SignInButton() {
    // account state
    const { isConnected, chain, address } = useAccount();
    // wagmi hook
    const { signMessageAsync } = useSignMessage()
    // internal state
    const [loading, setLoading] = useState(false);
    const [nonce, setNonce] = useState<string | undefined>(undefined);
    const [verified, setVerified] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    // sign in button handler
    const signIn = async () => {
        try {
            const chainId = chain?.id
            if (!address || !chainId) return

            setLoading(true)
            // Create SIWE message with pre-fetched nonce and sign with wallet
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce
            })
            
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })

            // Verify signature
            const verifyRes = await fetch('http://localhost:8080/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ message, signature }),
            })
            const verifyResJson = await verifyRes.json()

            if (!verifyResJson.success) {
                throw new Error(`Error verifying message: ${verifyResJson.message}`)
            }

            setLoading(false)
            setVerified(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const signOut = async () => {
        try {
            setLoading(true)
            await fetch('http://localhost:8080/logout', {
                method: 'GET',
                credentials: 'include',
            })
            setAuthenticated(false)
            setVerified(false)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // pre-fetch nonce for SIWE message
    useEffect(() => {
        const handler = async () => {
            try {
                const nonceRes = await fetch('http://localhost:8080/nonce', {
                    method: 'GET',
                    credentials: 'include',
                })
                const nonceResJson = await nonceRes.json()
                const nonceValue = await nonceResJson.responseObject
                setNonce(nonceValue)
            } catch (error) {
                console.log(error);
            }
        }
        // 1. page loads
        handler()
    }, [])

    // pre-fetch user
    useEffect(() => {
        const handler = async () => {
            try {
                const userRes = await fetch('http://localhost:8080/user', {
                    method: 'GET',
                    credentials: 'include',
                })
                const userResJson = await userRes.json()
                if (userResJson.success) {
                    const authenticatedAddress = userResJson.responseObject
                    if (authenticatedAddress !== address) {
                        throw new Error(`Error fetching user: User address mismatch`)
                    } else {
                        setAuthenticated(true)
                    }
                } else {
                    if (userResJson.statusCode !== 404) {
                        throw new Error(`Error authenticating user: ${userResJson.message}`)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        // 1. page loads
        handler()
    }, [verified, address])

    if (loading) {
        return <Button disabled><CircularProgress size={20} /></Button>
    }

    if (isConnected && chain) {
        return (
            <>
                {authenticated ?
                    <>
                    <Button variant="contained" disabled endIcon={<VerifiedUserIcon />}>Authenticated</Button>
                    <Button onClick={signOut}>Log Out</Button>
                    </>
                    :
                    <Button variant="contained" onClick={signIn} endIcon={<FingerprintIcon />}>Log In</Button>
                }
            </>
        )
    }

    return <></>
};