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

function hasValidToken() {
  const token = load()
  if (!token) {
    return false
  }
  const decoded = jwt_decode(token)
  // const exp = decoded.exp
  // const orig_iat = decode.orig_iat
  const now = new Date().now() / 1000
  if (decoded.exp > now) {
    return true
    /* expired: refresh */
  }

  // if (exp - Date.now() / 1000 < 1800 && Date.now() / 1000 - orig_iat < 628200) {
  //   //   this.dispatch("refreshToken")
  // } else if (exp - Date.now() / 1000 < 1800) {
  //   //   // DO NOTHING, DO NOT REFRESH
  // } else {
  //   //   // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
  // }
}

export default {
  dump,
  load,
  loadParsed,
  isExpired
}
