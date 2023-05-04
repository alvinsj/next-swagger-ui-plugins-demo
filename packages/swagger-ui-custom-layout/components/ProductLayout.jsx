import React from 'react'
import Topbar from "./Topbar"

class ProductLayout extends React.Component {
  render() {
    const {
      getComponent
    } = this.props
    const BaseLayout = getComponent("BaseLayout", true)
    return (
      <div className='swagger-ui swagger-container'>
        <Topbar {...this.props} />
        <BaseLayout />
      </div>
    )
  }
}

export default ProductLayout
