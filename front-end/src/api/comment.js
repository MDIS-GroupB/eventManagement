import api from './init'

let handleErrors
export function createComment(a) {
    console.log('==================')
    console.log(a)
    console.log('==================')
    return api.post(`/comment`, a)
}

export function getComments(id) {
    console.log("passed comment id is")
    console.log(id)
    return api.get(`/comment/${id}`)
        .then(res => {
            console.log("your comments res", res)
            return res.data.comments
        })
    // .catch(error => {
    //   console.log("res", error)
    //   throw Error(error)
    // })
}
