import api from './init'

let handleErrors
export function createComment(a) {
    console.log('==================')
    console.log(a)
    console.log('==================')
    return api.post(`/comment`, a)
}