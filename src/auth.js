const USER_TOKEN_KEY = "recordbin_usertoken"
const SERVER_URL_KEY = "recordbin_serverurl"

function saveServerUrl(url) {
  localStorage.setItem(SERVER_URL_KEY, url)
}

function readServerUrl() {
  localStorage.getItem(SERVER_URL_KEY)
}

function saveToken(token) {
  localStorage.setItem(USER_TOKEN_KEY, token)
}

function readToken() {
  return localStorage.getItem(USER_TOKEN_KEY)
}

function clearToken() {
  return localStorage.removeItem(USER_TOKEN_KEY)
}

function hasToken() {
  return readToken() !== null
}

export default {
  saveServerUrl,
  readServerUrl,
  saveToken,
  readToken,
  clearToken,
  hasToken
}
