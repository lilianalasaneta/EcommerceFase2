import { production } from "./productos"

const url = production? '/api/upload/' : 'http://localhost:8080/api/upload/'


function enviarFormDataAjax(formdata, progress, urlFoto) {
    let porcentaje = 0
    const xhr = new XMLHttpRequest()
    xhr.open('post', url)
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            const rta = JSON.parse(xhr.response)
            if(typeof urlFoto == 'function') urlFoto(rta.urlFoto)
        }
        else {
            console.error('Error al enviar el archivo', xhr.status)
        }
    })
    xhr.addEventListener('error', e => {
        console.error('Error en la comunicación al enviar el archivo', e)
    })
    xhr.upload.addEventListener('progress', e => {
        if(e.lengthComputable) {
            porcentaje = parseInt((e.loaded * 100) / e.total)
            if(typeof progress == 'function') progress(porcentaje)
        }
    })

    xhr.send(formdata)
}


export default {
    enviarFormDataAjax    
}