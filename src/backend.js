import axios from "axios"
import jwtToken from "@/jwtToken"

let $axios = axios.create({
  // baseURL: "/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${jwtToken.load()}`
  }
})

// Response Interceptor to handle and log errors
$axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    console.warn(error)
    return Promise.reject(error)
  }
)

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
  return $axios.post("/api/v1/auth/token-new/", form).then(response => {
    const rawToken = response.data.token
    jwtToken.dump(rawToken)
    $axios.defaults.headers = { Authorization: `JWT ${rawToken}` }
  })
}

// $backend.isLoggedIn = () => {
//   if (jwtToken.hasValidToken()) {

//   }
// }

export default $backend
