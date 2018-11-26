import api from './init'

export function charge(a) {
    return api.post(`/charge/`, a)
        .then(res => {
            console.log("res", res)
            return res
        })
}
export function test(amount, description, token) {
    return api.post("/charge",
        {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: amount
        })
}