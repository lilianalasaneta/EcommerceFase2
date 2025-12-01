import axios from "axios"
import { production } from "./productos"

//const url = 'http://localhost:8080/api/pedidos/'        // para ambiente de desarrollo
//const url = '/api/pedidos/'                             // para ambiente de producción

const url =  production? '/api/pedidos/' : 'http://localhost:8080/api/pedidos/'

const enviar = pedido => axios.post(url, pedido, {
    headers: { 'content-type':'application/json'}
}).then(r => r.data)


export default {
    enviar       // POST
}

