import api from './init'

let handleErrors
export function init(handleError) {
  handleErrors = handleError
}
export function getPersonalEvents() {
  return api.get(`/personalEvent`)
    .then(res => {
      console.log("res personalEvent", res)
      return res.data
    })
  // .catch(error => {
  // console.log("res",error)
  // throw Error(error)})
}
export function createEvent() {
  return api.post(`/personalEvent`)
    .then(res => {
      // console.log("res", res)
      // ????????
      return res.data
    })
  // .catch(error => {
  // console.log("res",error)
  // throw Error(error)})
}