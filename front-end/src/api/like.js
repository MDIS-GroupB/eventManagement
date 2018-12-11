import api from './init'

let handleErrors
export function init(handleError) {
    handleErrors = handleError
}

export async function doLike(id) {
    console.log("passed id is " + id)
    return api.post(`/likes/doLike/${id}`)
        .then(
            res => {
                console.log("res body is " + res.data.likeCount)
                return res.data.likeCount
            }
        )
}

export async function donLike(id) {
    console.log("dislike id is " + id)
    return api.post(`/likes/disLike/${id}`)
        .then(
            res => {
                console.log("res body is " + res.data.disLikeCount)
                return res.data.disLikeCount
            }
        )
}

export async function getLikeCount(id) {
    console.log("get like count triggered")
    console.log("id is the id " + id)
    return api.get(`likes/${id}`)
        .then(
            res => {
                console.log("likes body is " + JSON.stringify(res.data))
                return res.data
            }
        )
    // let response = await api.get(`likes/${id}`)
    // console.log(response.data)
    // return response.data
}