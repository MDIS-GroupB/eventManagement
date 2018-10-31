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
  //   console.log("res", error)
  //   throw Error(error)
  // })
}

export async function changeEventStatus(id, status) {
  // let a = {
  //   status: this.state.name,
  //   theme: this.state.theme,
  //   noOfTickets: this.state.noOfTickets,
  //   price: this.state.price,
  //   description: this.state.description,
  //   venueId:this.state.selectedVenue._id,
  // }
  let eventParams = {
    "status": status
  }
  return api.patch(`/admin/event/${id}`, eventParams)
    .then(res => {
      console.log("res after patch", res)
      if (!res.data) {
        return res.data
      }
    })
  // .catch(error => {
  //   console.log("res", error)
  //   throw Error(error)
  // })
}

