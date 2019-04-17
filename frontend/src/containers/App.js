import React, { useState, useEffect } from 'react'
import { getPullRequests, getRepositories } from '../core/api/functions'
import Loading from '../components/Loading'
import Dashboard from '../components/Dashboard'

const App = () => {
  const [pullRequests, setPullRequests] = useState([])
  const [repositories, setRepositories] = useState([])
  const [isFetching, setFetching] = useState(true)
  const [lastUpdate, setLastUpdate] = useState()

  const fetchData = () => {
    const prs = getPullRequests('parmaistecnologia')
    .then(res => {
      setPullRequests(res)
    })

    const repos = getRepositories('parmaistecnologia')
      .then(res => {
        setRepositories(res)
      })

    Promise.all([prs, repos]).then(() => {
      setFetching(false)
      setLastUpdate(new Date().toLocaleString())
    })
  }

  useEffect(() => {
    setFetching(true)

    fetchData()
    const id = setInterval(fetchData, 5 * 60000)

    return () => clearInterval(id)
  }, [])

  return (
    isFetching
    ?
      <Loading />
    :
      <Dashboard pullRequests={pullRequests} repositories={repositories} lastUpdate={lastUpdate} />
  )
}

export default App