import React from "react"

const wrapAuthItem = (Ori, system) => function WrappedOtpJwtAuthItem({ ...props }) {
  const {
    schema, getComponent, errSelectors, authorized, onAuthChange, name
  } = props

  const OtpJwtAuth = getComponent("OtpJwtAuth")
  const type = schema.get("type")
  const scheme = schema.get("scheme")
  const otp = schema.get("otp")
  
  if(type === "http" && scheme === 'bearer' && !!otp) {
    return <OtpJwtAuth key={ name }
              schema={ schema }
              name={ name }
              authSelectors={system.getSystem().authSelectors}
              errSelectors={ errSelectors }
              authorized={ authorized }
              getComponent={ getComponent }
              onChange={ onAuthChange }
              getSystem={system.getSystem} />
  }
}

export default wrapAuthItem
