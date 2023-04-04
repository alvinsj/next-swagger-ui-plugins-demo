import 'swagger-ui-react/swagger-ui.css'
import dynamic from 'next/dynamic'
import otpJwtAuthPlugin from '../plugins/otp-jwt-auth'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

export default function Home() {
  return (
    <>
      <SwaggerUI
        url="./swagger.yaml"
        plugins={[otpJwtAuthPlugin]}
        persistAuthorization
      />
    </>
  )
}
