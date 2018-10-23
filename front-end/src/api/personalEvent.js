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
export function createEvent(a) {
  console.log('==================')
  console.log(a)
  console.log('==================')
  return api.post(`/personalEvent`, { hello: 'hai' })
    .then(res => {
      // console.log("res", res)
      // ????????
      return res.data
    })
  // .catch(error => {
  // console.log("res",error)
  // throw Error(error)})
}