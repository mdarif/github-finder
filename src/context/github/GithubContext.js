import { createContext, useReducer } from 'react'
import { createRoutesFromChildren } from 'react-router-dom'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  /*   const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true) */
  const initialState = {
    users: [],
    loading: false,
    repos: [],
    user: {}
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async text => {
    setLoading()

    // The URLSearchParams interface defines utility methods to work with the query string of a URL.
    const params = new URLSearchParams({
      //
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const { items } = await response.json()
    /*     setUsers(data)
    setLoading(false) */
    dispatch({
      type: 'GET_USERS',
      payload: items
    })
    //console.log('data', data)
  }

  // Get single user
  const getUser = async login => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      console.log('response.ok then data: ', data)

      dispatch({
        type: 'GET_USER',
        payload: data
      })
    } else {
      window.location = '/notfound'
    }
  }

  // Get user repos
  const getUserRepos = async login => {
    setLoading()

    // The URLSearchParams interface defines utility methods to work with the query string of a URL.
    const params = new URLSearchParams({
      //
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    )

    const data = await response.json()
    /*     setUsers(data)
  setLoading(false) */
    dispatch({
      type: 'GET_REPOS',
      payload: data
    })
  }

  // Set loading
  const setLoading = () => {
    return dispatch({
      type: 'SET_LOADING'
    })
  }

  // Clear users from state
  const clearUsers = () => {
    return dispatch({
      type: 'CLEAR_USERS'
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
