import api from './init'

export function getEventData() {
  return api.get(`/admin/event/`)
    .then(res => {
      if (res) {
        return res.data
      }
    })
}
export function getBookingData() {
  return api.get(`/admin/booking/`)
    .then(res => {
      if (res) {
        return res.data
      }
    })
}