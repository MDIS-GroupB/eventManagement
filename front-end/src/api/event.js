import api from './init'

let handleErrors
export function init(handleError) {
  handleErrors = handleError
}
export function getEvents() {
  return api.get(`/event/`)
    .then(res => {
      return res.data
    })
}
export function postCharge() {
  return api.post(`/charge/`)
    .then(res => {
      return res.data
    })
}
export function createBooking(data) {
  return api.post(`/charge/booking`, data)
    .then(res => {
      return res.data
    })
}

export function getEvent(id) {
  return api.get(`/event/${id}`)
    .then(res => {
      return res.data
    })
  // .catch(error => {
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
      if (!res.data) {
        return res.data
      }
    })
  // .catch(error => {
  //   throw Error(error)
  // })
}

export async function likeEvent(id) {
  console.log("like id is " + id)
  return api.post(`/event/like/${id}`)
    .then(
      res => {
        console.log("res body is " + res.data.like)
        return res.data.like
      }
    )
}


export async function disLikeEvent(id) {
  console.log("dislike id is " + id)
  return api.post(`event/disLike/${id}`)
    .then(
      res => {
        console.log("res body is " + res.data.disLike)
        return res.data.disLike
      }
    )
}


