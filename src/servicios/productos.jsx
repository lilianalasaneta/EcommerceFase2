import axios from "axios"

//const url = 'https://6900fbf5ff8d792314bc3720.mockapi.io/api/pedidos/1/productos/'


const url = 'https://6900fbf5ff8d792314bc3720.mockapi.io/api/productos/'

const getAllProductos = () => axios.get(url).then(r => r.data)

const guardarProducto = prod => axios.post(url, prod, {
    headers: { 'content-type':'application/json'}
}).then(r => r.data)

const actualizarProducto = (id,prod) => axios.put(url+id, prod, {
    headers: { 'content-type':'application/json'}
}).then(r => r.data)

const eliminarProducto = id => axios.delete(url+id).then(r => r.data)

export default {
    getAllProductos,         // GET
    guardarProducto,        // POST
    actualizarProducto,     // PUT
    eliminarProducto       // DELETE
}

