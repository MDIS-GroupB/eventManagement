import api from './init'

export function getEventData() {
  return api.get(`/admin/event/`)
    .then(res => {
      if (res) {
        return res.data
      }
    })
}