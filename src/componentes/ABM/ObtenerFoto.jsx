import './ObtenerFoto.css'
import servicioUpload from '../../servicios/upload'
import { useState } from 'react'


export function ObtenerFoto(props) {
    const { escribirCampoFoto } = props
    const [porcentaje, setPorcentaje] = useState(0)
    const [urlFoto, setUrlFoto] = useState('')



    const dragEnter = e => {
        e.preventDefault()
        console.log('dragEnter')
    }



    const dragLeave = e => {
        e.preventDefault()
        console.log('dragLeave')
    }



    const dragOver = e => {
        e.preventDefault()
        console.log('dragOver')
    }



    const drop = e => {
        e.preventDefault()
        const archivo = e.dataTransfer.files[0]
        console.log('drop', archivo)
        enviarFoto(archivo)
    }        



    const change = e => {
        const archivo = e.target.files[0]
        enviarFoto(archivo)
    }



    const enviarFoto = archivo => {
        if(archivo.type.includes('image/')) {
            const formdata = new FormData()
            formdata.append('archivo', archivo)

            servicioUpload.enviarFormDataAjax(formdata, porcentaje => {
                //console.log(porcentaje)
                setPorcentaje(porcentaje)
            }, urlFoto => {
                //console.log(urlFoto)
                setUrlFoto(urlFoto)
                escribirCampoFoto(urlFoto)
            })
        }
        else console.error('El archivo a enviar no es una imágen válida')        
    }


    
    return (
        <div className="ObtenerFoto">
            <input type="file" id="archivo" onChange={change} />
            <div 
                id="drop"
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
            >
                { porcentaje > 0 && 
                    <>
                        <progress max="100" value={porcentaje}></progress> 
                        <span>{porcentaje}%</span>
                    </> 
                }
                { porcentaje > 0
                    ? ( urlFoto? <img src={urlFoto} alt="" /> : <></>)
                    : <label htmlFor="archivo">Drag And Drop & Click</label>
                }
            </div>
        </div>
    )
}