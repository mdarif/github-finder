import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_TOKEN = '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'

export const GithubProvider = ({ children }) => {
  /*   const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true) */
  const initialState = {
    users: [],
    loading: false
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
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
