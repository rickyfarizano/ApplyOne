import React from 'react'
import styled from 'styled-components'

const StateTag = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    display: inline-block;
    background-color: ${({$state}) => {
        switch($state) {
            case 'contactado':
                return "var(--estado-contactado)";
            case 'en proceso':
                return "var(--estado-en-proceso)";
            case 'entrevista concretada':
                return "var(--estado-entrevista-concretada)";
            case 'no contactado':
                return "var(--estado-no-contactado)";
            default :
            return "#f2f2f2";
        }
    }};
`

const jobState = ({state}) => {
  return (
    <StateTag $state={state}>{state}</StateTag>
  )
}

export default jobState