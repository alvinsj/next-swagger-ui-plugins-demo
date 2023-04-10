
import dynamic from 'next/dynamic'
import otpJwtAuthPlugin from '@/plugins/otp-jwt-auth'
import productLayoutPlugin from '@/plugins/product-layout'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

export default function Home() {
  return (
    <>
      <SwaggerUI
        url={process.env.NEXT_PUBLIC_SWAGGER_URL}
        // url="./swagger.yaml"
        layout="ProductLayout"
        plugins={[otpJwtAuthPlugin, productLayoutPlugin]}
      />
    </>
  )
}
