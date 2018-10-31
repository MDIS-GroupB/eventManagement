import api from './init'

export function getEventData() {
  return api.get(`/admin/event/`)
    .then(res => {
      if (res) {
        console.log("here is your res", res)
        return res.data
      }
    })
}