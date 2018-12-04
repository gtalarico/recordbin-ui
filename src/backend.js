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

$axios.interceptors.request.use(config => {
  if (config.noIntercept) return config

  return new Promise((resolve, reject) => {
    if (jwtToken.hasValidToken()) {
      return resolve()
    }
    if (jwtToken.hasValidRefreshToken()) {
      const payload = { token: jwtToken.load() }
      $backend
        .refresh(payload)
        .then(responseData => {
          console.log("Token Refreshsed!")
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    } else {
      reject(`No or Invalid token`)
    }
  })
    .then(() => {
      // config.headers["Authorization"] = responseData.token
      return Promise.resolve(config)
    })
    .catch(error => {
      console.log(error)
    })
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
  return $axios
    .post("/api/v1/auth/token-new/", form, { noIntercept: true })
    .then(response => {
      const rawToken = response.data.token
      jwtToken.dump(rawToken)
      $axios.defaults.headers = { Authorization: `JWT ${rawToken}` }
    })
}

$backend.refresh = payload => {
  return $axios
    .post("/api/v1/auth/token-refresh/", payload, { noIntercept: true })
    .then(response => {
      const rawToken = response.data.token
      jwtToken.dump(rawToken)
      $axios.defaults.headers = { Authorization: `JWT ${rawToken}` }
    })
}

$backend.verify = payload => {
  return $axios
    .post("/api/v1/auth/token-verify/", payload, { noIntercept: true })
    .then(response => {
      if (response.status === 200 && response.data.token) {
        return response.data
      }
    })
}

export default $backend
