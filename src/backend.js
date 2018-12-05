import axios from "axios"
import auth from "@/auth"

let $axios = axios.create({
  timeout: 5000,
  baseURL: auth.readServerUrl() || "/",
  headers: {
    "Content-Type": "application/json"
  }
})

// Response Interceptor to handle and log errors
$axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (typeof error.response === "undefined") {
      console.error(error)
    } else if (error.response.status == 401) {
      console.warn("Invalid Credentials")
      auth.clearToken()
    }
    return Promise.reject(error)
  }
)

$axios.interceptors.request.use(config => {
  const token = auth.readToken()
  if (token) config.headers["Authorization"] = `UserToken ${token}`
  return config
})

let $backend = {}

$backend.fetch = resourceName => {
  const url = `/api/v1/${resourceName}/`
  return $axios.get(url).then(response => response.data)
}

$backend.post = (resourceName, payload) => {
  const url = `/api/v1/${resourceName}/`
  return $axios.post(url, payload).then(response => response.data)
}

$backend.login = form => {
  $axios.baseURL = form.serverUrl
  auth.saveServerUrl(form.serverUrl)
  return $axios
    .post("/api/v1/auth/token/login/", form)
    .then(response => {
      const userToken = response.data["auth_token"]
      auth.saveToken(userToken)
      $axios.defaults.headers = { Authorization: `UserToken ${userToken}` }
    })
    .catch(error => {
      if (typeof error.response === "undefined") {
        throw Error("Invalid Server Url")
      } else {
        throw error
      }
    })
}

$backend.logout = () => {
  $axios.defaults.baseURL = ""
  auth.clearToken()
  const url = `/api/v1/auth/tokens/logout/`
  return $axios.post(url).then()
}

$backend.getUser = () => {
  return $axios.get("/api/v1/auth/users/me/").then(response => {
    return response.data
  })
}

export default $backend
