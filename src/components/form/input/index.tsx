import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
import React from 'react'

const H1 = styled('h1', {
  shouldForwardProp: prop => {
    return isPropValid(prop)
  }
})(props => {
  return {
    color: 'hotpink'
  }
})

const Input = () => <H1 color='lightgreen'> This is an H1 heading </H1>

export default Input
