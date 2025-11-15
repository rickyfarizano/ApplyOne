import React from 'react'
import styled from 'styled-components'

const StyledP = styled.p`
    color: #ca1111;
    font-size: .9rem;
    font-family: 'Poppins', 'Montserrat', sans-serif;
    font-weight: 400;
    text-align: left;
`

const ErrorMessage = ({errorText}) => {
  return (
    <StyledP>{errorText}</StyledP>
  )
}

export default ErrorMessage