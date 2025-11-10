import axios from "axios"

//const url = 'https://6900fbf5ff8d792314bc3720.mockapi.io/api/pedidos/'


const url = 'https://6900fbf5ff8d792314bc3720.mockapi.io/api/pedidos/'

const enviar = pedido => axios.post(url, pedido, {
    headers: { 'content-type':'application/json'}
}).then(r => r.data)


export default {
    enviar,        // POST
}

