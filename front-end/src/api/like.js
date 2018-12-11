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
                console.log("res body is " + res.data.like)
                return res.data.like
            }
        )
}

export async function donLike(id) {
    console.log("dislike id is " + id)
    return api.post(`/likes/donLike/${id}`)
        .then(
            res => {
                console.log("res body is " + res.data.disLike)
                return res.data.disLike
            }
        )
}

export async function doNeutral(id) {
    console.log("dislike id is " + id)
    return api.post(`likes/doNeutral/${id}`)
        .then(
            res => {
                console.log("res body is " + res.data.disLike)
                return res.data.disLike
            }
        )
}

export async function getLikes(id) {
    return api.get(`likes/getLikes/${id}`)
}