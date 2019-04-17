import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #32333e;
  color: #ffffff;
`

const Loading = () => {
  return (
    <Container>
      Loading...
    </Container>
  )
}

export default Loading