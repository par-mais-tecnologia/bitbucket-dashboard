import React from 'react'
import styled from 'styled-components'
import RepositoriesTable from './RepositoriesTable'
import PullRequestsTable from './PullRequestsTable'
import Draw from './Draw'
import LastUpdate from './LastUpdate'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #32333e;
  color: #ffffff;
  padding: 40px 0;
  box-sizing: border-box;
`

const RepositoriesContainer = styled.div`
  display: flex;
  width: 45%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`

const PullRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`

const DrawContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  opacity: 0.3;
`

const Dashboard = ({ pullRequests, repositories, lastUpdate }) => {
  return (
    <Container>
      <RepositoriesContainer>
        <RepositoriesTable data={repositories} />
      </RepositoriesContainer>
      <PullRequestsContainer>
        <PullRequestsTable data={pullRequests} />
        <LastUpdate on={lastUpdate} />
        <DrawContainer>
          <Draw />
        </DrawContainer>
      </PullRequestsContainer>
    </Container>
  )
}

export default Dashboard