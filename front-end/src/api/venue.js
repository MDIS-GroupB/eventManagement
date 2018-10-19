import api from './init'

let handleErrors
export function init(handleError) {
    handleErrors = handleError
}
export function getVenues() {
    return api.get(`/venue`)
  .then(res => {
    console.log("res",res)
    return res.data
  })
  // .catch(error => {
    // console.log("res",error)
    // throw Error(error)})
}