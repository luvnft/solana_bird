import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function AppBar() {
  return (

    <div
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   padding: "0 1rem",
      //   height: "6rem",
      //   borderBottom: "1px solid #eaeaea",
      //   position: "fixed",
      //   margin: "1rem",
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   zIndex: 100,
      // }}
      className="app-bar"
    >
      <a
        href="/"
        style={{
          textDecoration: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="app-title">SOLBIRD</span>
        <Image
          src="/solana_bird.png"
          width={70}
          height={70}
          alt="Solana Bird Logo"
        />
      </a>
      
      <div className="wallet-connector">
        <WalletMultiButton />
      </div>
      
    </div>
  );
}
