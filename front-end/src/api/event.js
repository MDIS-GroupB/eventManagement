import api from './init'

let handleErrors
export function init(handleError) {
    handleErrors = handleError
}

export function createEvent(eventDetails) {
  console.log(eventDetails)
    return api.post(`/event/venues`,{
      ...eventDetails
    })
  .then(res => {
    console.log("res",res)
    return res.data
  })
  // .catch(error => {
    // console.log("res",error)
    // throw Error(error)})
}
export function getVenues() {
    return api.get(`/event/venues`)
  .then(res => {
    console.log("res",res)
    return res.data
  })
  // .catch(error => {
    // console.log("res",error)
    // throw Error(error)})
}