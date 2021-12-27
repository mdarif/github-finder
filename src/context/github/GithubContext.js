import { createContext, useState } from 'react'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_TOKEN = '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'

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json()
    setUsers(data)
    setLoading(false)
    console.log('data', data)
  }

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
