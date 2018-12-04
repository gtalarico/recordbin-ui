import jwt_decode from "jwt-decode"

function dump(token) {
  localStorage.setItem("recordbin_jwt", token)
}

function load() {
  return localStorage.getItem("recordbin_jwt")
}

function loadParsed() {
  const token = load()
  return load() ? jwt_decode(token) : null
}

function isInFuture(timeInSeconds) {
  const seconds = 1000
  const now = new Date().getTime()
  const nowInSeconds = Math.round(now / seconds)
  const bool = timeInSeconds > nowInSeconds
  console.log(`Time Check Valid: ${bool}`)
  return bool
}

function hasToken() {
  return Boolean(load())
}

function hasValidToken() {
  const parsedToken = loadParsed()
  return isInFuture(parsedToken.exp)
}

function hasValidRefreshToken() {
  const parsedToken = loadParsed()
  const refreshLengthInSeconds = 604800 // 7 Days
  const refreshExpiration = parsedToken.orig_iat + refreshLengthInSeconds
  return isInFuture(refreshExpiration)
}

export default {
  dump,
  load,
  loadParsed,
  hasToken,
  hasValidToken,
  hasValidRefreshToken
}
