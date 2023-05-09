
import dynamic from 'next/dynamic'
import otpJwtAuthPlugin from 'swagger-ui-plugin-otp-auth'
import productLayoutPlugin from 'swagger-ui-custom-layout'
import samlAuthPlugin from 'swagger-ui-plugin-saml-auth'
import chainWrapComponents from 'chain-wrap-components'

// swagger-ui-react is not SSR compatible
const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

export default function Home() {

  return (
    <>
      <SwaggerUI
        url={process.env.NEXT_PUBLIC_SWAGGER_URL || '/swagger-example.yaml'}
        // url="./swagger.yaml"
        layout="ProductLayout"
        plugins={[chainWrapComponents(samlAuthPlugin, otpJwtAuthPlugin), productLayoutPlugin]}
        pluginsOptions={{
          // FIXME this doesn't work 
          pluginLoadType: 'chain'
        }}
      />
    </>
  )
}
