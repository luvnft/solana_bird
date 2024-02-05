"use client";
import React, { useMemo  } from "react";
import { Inter } from 'next/font/google'
import './globals.css'
// Wallet adaptor imports
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection } from '@solana/web3.js';

const inter = Inter({ subsets: ['latin'] })

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
const network = WalletAdapterNetwork.Devnet;
const connection = new Connection(clusterApiUrl("devnet"), {
  commitment: "confirmed",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter()
      ],
      [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <html lang="en">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content="Flappy Bird on Solana" />
              <title>SOLBIRD</title>
            </head>
            <body className={inter.className}>{children}</body>
          </html>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
