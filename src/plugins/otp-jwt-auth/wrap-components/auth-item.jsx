import React from "react"

const wrapAuthItem = (Ori, system) => function WrappedAuthItem({ Ori, ...props }) {
  const {
    schema, getComponent, authSelectors, errSelectors, authorized, onAuthChange, name
  } = props

  console.log('yessss', props)

  const OtpJwtAuth = getComponent("OtpJwtAuth")
  const type = schema.get("type")
  const scheme = schema.get("scheme")

  if(type === "http" && scheme === 'bearer') {
    return <OtpJwtAuth key={ name }
              schema={ schema }
              name={ name }
              authSelectors={authSelectors}
              errSelectors={ errSelectors }
              authorized={ authorized }
              getComponent={ getComponent }
              onChange={ onAuthChange }
              getSystem={system.getSystem} />
  } else {
    return <Ori {...props} />
  }
}

export default wrapAuthItem
