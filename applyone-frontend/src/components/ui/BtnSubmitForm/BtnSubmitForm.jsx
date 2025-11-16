import React from 'react'
import styled from 'styled-components'

const FormButton = styled.button`
    background-color: ${({$bgColor}) => $bgColor};
    color: ${({$textColor}) => $textColor};
    border-radius: 10px;
    border: none;
    padding: 0.625rem;
    font-size: 1rem;
    font-family: 'Poppins', 'Montserrat', sans-serif;
    font-weight: 400;
    transition: .2s all ease-in-out;
    &:hover {
        background-color: ${({$bgColorHover}) => $bgColorHover};
        cursor: pointer;
    }
`

const BtnSubmitForm = ({
    buttonText,
    bgColor,
    textColor,
    bgColorHover,
    btnType
}) => {
  return (
    <FormButton
    type={btnType}
    $bgColor={bgColor}
    $textColor={textColor}
    $bgColorHover={bgColorHover}
    >
        {buttonText}
    </FormButton>
  )
}

export default BtnSubmitForm