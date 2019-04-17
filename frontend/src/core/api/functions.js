import axios from 'axios'
import { sort } from '../utils'

const api = process.env.REACT_APP_API_URL

export const getPullRequests = (team) => {
  return axios.get(`${api}/pullRequests/${team}`)
    .then(response => sort(response.data, 'updated_on', 'desc'))
}

export const getRepositories = (team) => {
  return axios.get(`${api}/repositories/${team}`)
    .then(response =>  sort(response.data, 'updated_on', 'asc'))
}