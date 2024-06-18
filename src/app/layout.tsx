import type { Metadata } from "next";
import React from "react";
import Head from "next/head";
import StoreProvider from "../lib/StoreProvider";
export const metadata: Metadata = {
  title: "My App",
  description: "My App is a...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </Head>
      <StoreProvider>
        <div id="root">{children}</div>
      </StoreProvider>
    </>
  );
}
