import 'swagger-ui-react/swagger-ui.css'
import '@/styles/theme-feeling-blue.css'

import '@/styles/product.css'
import '@/styles/globals.css'


import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
