import api from './init'

let handleErrors
export async function createComment(a) {
    let prevComments = await api.post(`/comment`, a)
    return prevComments.data.comments
}

export function getComments(id) {
    return api.get(`/comment/${id}`)
        .then(res => {
            return res.data.comments
        })
        .catch(error => {
            throw Error(error)
        })
}
