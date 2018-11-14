import api from './init'

export function bookEvent(a) {
    console.log('==================')
    console.log(a)
    console.log('==================')
    return api.get(`/payment`, a)
    //   .then(res => {
    //     // console.log("res", res)
    //     // ????????
    //     return res.data
    //   })
    // .catch(error => {
    // console.log("res",error)
    // throw Error(error)})
}