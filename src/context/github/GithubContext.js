import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

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

  return (
    <GithubContext.Provider
      value={{
        /* users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos, */
        ...state, // Spread across all the state values rather as above one individually
        dispatch
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
