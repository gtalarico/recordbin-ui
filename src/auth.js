const KEY_NAME = "recordbin_usertoken"

function saveToken(token) {
  localStorage.setItem(KEY_NAME, token)
}

function readToken() {
  return localStorage.getItem(KEY_NAME)
}

function clearToken() {
  return localStorage.removeItem(KEY_NAME)
}

function hasToken() {
  return readToken() !== null
}

export default {
  saveToken,
  readToken,
  clearToken,
  hasToken
}
