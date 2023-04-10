
import dynamic from 'next/dynamic'
import otpJwtAuthPlugin from '@/plugins/otp-jwt-auth'
import productLayoutPlugin from '@/plugins/product-layout'
import samlAuthPlugin from '@/plugins/saml-auth'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

export default function Home() {
  return (
    <>
      <SwaggerUI
        url={process.env.NEXT_PUBLIC_SWAGGER_URL}
        // url="./swagger.yaml"
        layout="ProductLayout"
        plugins={[samlAuthPlugin, otpJwtAuthPlugin, productLayoutPlugin]}
      />
    </>
  )
}
