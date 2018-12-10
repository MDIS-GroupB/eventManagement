import api from './init'

let handleErrors
export async function createComment(a) {
    console.log('==================')
    console.log(a)
    console.log('==================')
    let prevComments = await api.post(`/comment`, a)
    // console.log("prev Comments " + JSON.stringify(prevComments.data.comments))
    return prevComments.data.comments
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
