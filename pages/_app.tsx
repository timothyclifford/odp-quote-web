import '../styles/globals.css'
import type { AppProps } from 'next/app'

function QuoteApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default QuoteApp
