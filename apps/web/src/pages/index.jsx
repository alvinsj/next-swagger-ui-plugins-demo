
import dynamic from 'next/dynamic'
import otpJwtAuthPlugin from 'swagger-ui-plugin-otp-auth'
import productLayoutPlugin from '@dsaid/swagger-ui-custom-layout'
import samlAuthPlugin from 'swagger-ui-plugin-saml-auth'
import deepMerge from 'deepmerge'

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

export const chainWrapComponents = (first, ...plugins) => (system) =>
  plugins.reduce((ori, plugin) => {
    const { wrapComponents, ...pluginConfig } = plugin(system)
    const { wrapComponents: oriWrapComponents, ...oriPluginConfig } = ori

    return {

      wrapComponents: Object.entries(wrapComponents).reduce((merged, [key, wrapComponent]) => {
        const chained = oriWrapComponents?.[key] ?
          (ori, sys) => function Chained(props) {

            const First = wrapComponent(ori, sys)
            const Second = oriWrapComponents?.[key](ori, sys)

            return <>
              {First && <First {...props} />}
              {Second && <Second {...props} />}
            </>
          } : wrapComponent

        return {
          ...merged,
          [key]: chained
        }
      }, oriWrapComponents || {}),


      ...deepMerge(oriPluginConfig, pluginConfig)
    }
  }, first(system))

