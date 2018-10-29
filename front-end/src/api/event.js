import api from './init'

let handleErrors
export function init(handleError) {
  handleErrors = handleError
}
export function getEvents() {
  return api.get(`/event/`)
    .then(res => {
      console.log("res", res)
      return res.data
    })
  // .catch(error => {
  // console.log("res",error)
  // throw Error(error)})
}

export function getEvent(id) {
  return api.get(`/event/${id}`)
    .then(res => {
      console.log("res", res)
      return res.data
    })
  // .catch(error => {
  // console.log("res",error)
  // throw Error(error)})
}