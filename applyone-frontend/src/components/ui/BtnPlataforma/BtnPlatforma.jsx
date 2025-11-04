import React from 'react'
import styled from 'styled-components'

const PlatformButton = styled.button`
  padding: 8px;
  border-radius: 10px;
  color: ${({$active}) => ($active ? '#ffffff' : '#0040ffbd')};
  background-color: ${({$active}) => ($active ? '#5E17EB' : 'transparent')};
  font-family: 'Poppins', 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 1.188rem;
  border: none;
  
  &:hover {
    color: ${({$active}) => ($active ? '#ffffff' : '#0040ff7a')};
    background-color: ${({$active}) => ($active ? '#41129f' : 'transparent')};
    cursor: pointer;
    transition: .2s all ease-in-out;
  }
`

const BtnPlatforma = ({
  platform_name = '', 
  setActualPlatform,
  actualPlatform,
}) => {
  const isActive = actualPlatform === platform_name

  return (
    <>
    <PlatformButton 
    type='button'
    $active={isActive}
    onClick={() => setActualPlatform(platform_name)}
    >
    {platform_name}
    </PlatformButton>
    </>
  )
}

export default BtnPlatforma