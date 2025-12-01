
import axios from "axios"

export const production = import.meta.env.MODE == 'production'

//const url = 'http://localhost:8080/api/productos/'      // para ambiente de desarrollo
//const url = '/api/productos/'                             // para ambiente de producción

const url = production? '/api/productos/' : 'http://localhost:8080/api/productos/'



export const proxyProducto = producto => {
    const handler = {
        get(target, prop) {
            //if(prop == 'id') prop = '_id'
            if(target['_id'] && prop == 'id') prop = '_id'
            return target[prop]
        }
    }

    return new Proxy(producto, handler)
}



const eliminarPropiedad = (obj, prop) => {
    const objClon = {...obj}        
    delete objClon[prop]
    return objClon
}



const getAllProductos = async () => (await axios.get(url)).data.map(producto => proxyProducto(producto))


const guardarProducto = async prod => proxyProducto((await axios.post(url, prod)).data)


const actualizarProducto =  async (id,prod) => proxyProducto((await axios.put(url+id, eliminarPropiedad(prod, '_id'))).data)


const eliminarProducto = async id => proxyProducto((await axios.delete(url+id)).data)


export default {
    getAllProductos,         // GET
    guardarProducto,        // POST
    actualizarProducto,     // PUT
    eliminarProducto       // DELETE
}






/*
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

*/

/*

import axios from "axios"
const url = 'http://localhost:8080/api/productos/' 

export const proxyProducto = producto => {
    // AÑADE ESTA VALIDACIÓN para prevenir el error
    if (producto === null || typeof producto !== 'object') {
        console.warn("proxyProducto recibió un valor no-objeto:", producto);
        return producto; // Devuelve el valor original (ej. null/undefined) para que el llamador lo maneje
    }

    const handler = {
        get(target, prop) {
            if(target['_id'] && prop == 'id') prop = '_id'
            return target[prop]
        }
    }

    // La línea 18 es donde fallaba:
    return new Proxy(producto, handler)
}

const eliminarPropiedad = (obj, prop) => {
    const objClon = {...obj}        
    delete objClon[prop]
    return objClon
}

const getAllProductos = async () => (await axios.get(url)).data.map(producto => proxyProducto(producto))

// AÑADE VALIDACIÓN DE RESPUESTA EN LAS FUNCIONES ASÍNCRONAS
// AÑADE VALIDACIÓN DE RESPUESTA EN LAS FUNCIONES ASÍNCRONAS
const guardarProducto = async prod => {
    const response = await axios.post(url, prod);
    // Si la API no devuelve datos, 'response.data' es null/undefined
    return proxyProducto(response.data || {}); 
}

const actualizarProducto =  async (id,prod) => {
    const response = await axios.put(url+id, eliminarPropiedad(prod, '_id'));
    return proxyProducto(response.data || {});
}

const eliminarProducto = async id => {
    const response = await axios.delete(url+id);
    return proxyProducto(response.data || {});
}

export default {
    getAllProductos,
    guardarProducto,
    actualizarProducto,
    eliminarProducto
}
    */