import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import NextNProgress from 'nextjs-progressbar';
import '../styles/global.scss';
import '@suiet/wallet-kit/style.css';
import '../styles/suiet-wallet-kit-custom.css';
import '../styles/slick.scss';
import { ToastContainer } from 'react-toastify';
import Layout from '@components/common/Layout';
import { josh, reactQueryConfig, nProgressConfig, toastConfig } from '@config/app.config';
import Script from 'next/script';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: reactQueryConfig,
        },
      })
  );

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
          {true && (
            <>
              <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-B35PDN24XE"
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-B35PDN24XE');
                `}
              </Script>
            </>
          )}
          <Layout>
            <NextNProgress {...nProgressConfig} />
            <main className={josh.className}>
              <Component {...pageProps} />
            </main>
            <ToastContainer {...toastConfig} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
