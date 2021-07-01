import React from "react"
import Loader from 'react-loader-spinner'
class SpinnerComponent extends React.Component {
  render() {
    return (
      <div style={{ width:'100vw', height:'100%', zIndex:10000, position:"fixed",background:'#262c49' }}>
        <Loader type="ThreeDots" color="#ff9f43" height={80} width={80} style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}/>	
      </div>
    )
  }
}

export default SpinnerComponent