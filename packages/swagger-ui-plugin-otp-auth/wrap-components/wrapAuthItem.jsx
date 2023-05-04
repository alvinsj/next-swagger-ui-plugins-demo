import React from "react"

const wrapAuthItem = (Ori, system) => function WrappedOtpAuthItem({ ...props }) {
  const {
    schema, getComponent, errSelectors, authorized, onAuthChange, name
  } = props

  const OtpAuth = getComponent("OtpAuth")
  const type = schema.get("type")
  const scheme = schema.get("scheme")
  const otp = schema.get("otp")
  
  if(type === "http" && scheme === 'bearer' && !!otp) {
    return <OtpAuth key={ name }
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
