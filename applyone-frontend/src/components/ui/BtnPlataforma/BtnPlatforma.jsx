import React from 'react'
import styled from 'styled-components'

const BtnPlatforma = ({platform_name = '', setActualPlatform}) => {
  return (
    <>
    <button type='button' onClick={() => setActualPlatform(platform_name)}>{platform_name}</button>
    </>
  )
}

export default BtnPlatforma