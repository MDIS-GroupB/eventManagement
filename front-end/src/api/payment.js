import api from './init'

export function bookEvent(a) {
    console.log('==================')
    console.log(a)
    console.log('==================')
    let resFromAPI = api.get(`/payment`, a)
    console.log(resFromAPI)
    return resFromAPI
    //   .then(res => {
    //     // console.log("res", res)
    //     // ????????
    //     return res.data
    //   })
    // .catch(error => {
    // console.log("res",error)
    // throw Error(error)})
}