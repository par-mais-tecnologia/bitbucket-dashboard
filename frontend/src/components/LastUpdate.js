import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
  width: 100%;
  font-size: 0.875rem;
  opacity: 0.5;
  text-align: right;
  font-style: italic;
  padding: 1rem 0;
`

const LastUpdate = ({ on }) => {
  return (
    <Span>Last update on {on}</Span>
  )
}

export default LastUpdate