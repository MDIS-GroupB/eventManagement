import api from './init'

let handleErrors
export function init(handleError, signOut) {
  handleErrors = handleError
}

export function signIn({ email, password }) {
  return api.post(`/auth`, {
    "email": email,
    "password": password
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function register({ email, password, firstName, lastName }) {
  return api.post(`/auth/register`, {
    "email": email,
    "password": password,
    "firstName": firstName,
    "lastName": lastName
  })
    .then(res => res.data)
    .catch(error => {
      throw Error(error.message)
    })
}
// export function register({ email, password }) {
//     return api.post('/auth/register', {
//         email,
//         password
//     }).then(res => res.data)
// }
