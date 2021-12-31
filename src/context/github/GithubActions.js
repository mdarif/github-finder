import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`
  }
})

// Get search results
export const searchUsers = async text => {
  // The URLSearchParams interface defines utility methods to work with the query string of a URL.
  const params = new URLSearchParams({
    q: text
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items

  /*   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const { items } = await response.json()

  return items */
}

// Get single user
/* export const getUser = async login => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  if (response.ok) {
    const data = await response.json()
    console.log('response.ok then data: ', data)
    return data
  } else {
    window.location = '/notfound'
  }
} */

// Get User and repos

export const getUserAndRepos = async login => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`, {
      params: {
        sort: 'created',
        per_page: 10
      }
    })
  ])

  return { user: user.data, repos: repos.data }
}

// Get user repos
/* export const getUserRepos = async login => {
  // The URLSearchParams interface defines utility methods to work with the query string of a URL.
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const data = await response.json()
  return data
} */
