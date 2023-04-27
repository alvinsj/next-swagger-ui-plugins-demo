import React from 'react'
import deepMerge from "deepmerge";

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
          } : wrapComponent;

        return {
          ...merged,
          [key]: chained
        }
      }, oriWrapComponents || {}),


      ...deepMerge(oriPluginConfig, pluginConfig)
    }
  }, first(system))

  export default chainWrapComponents;
