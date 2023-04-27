import React from "react"

const wrapAuthItem = (Ori, system) => function WrappedSamlAuthItem({ Ori, ...props }) {
  const {
    schema, getComponent, errSelectors, authorized, onAuthChange, name
  } = props

  const SamlAuth = getComponent("SamlAuth")
  const type = schema.get("type")
  const scheme = schema.get("scheme")
  const saml = schema.get("saml")

  if(type === "http" && scheme == 'bearer' && !!saml) {
    return <SamlAuth key={ name }
              schema={ schema }
              name={ name }
              authSelectors={system.getSystem().authSelectors}
              errSelectors={ errSelectors }
              authorized={ authorized }
              getComponent={ getComponent }
              onChange={ onAuthChange }
              getSystem={system.getSystem} />
  }
  else if(!Ori) return <div />
  else {
    return <Ori {...props} />
  }
}

export default wrapAuthItem
