import React, { useState, useEffect } from 'react';
import './Contacto.css'

function Contacto() {

  const camposVacios = {
      nombre: '',
      email: '',
      mensaje: '',
  }

  const [contacto, setContacto] = useState(camposVacios)
  const [errores, setErrores] = useState({})
  const [mensajeExito, setMensajeExito] = useState(false)



  const validarCampos = (campo, valor) => {
    let error = ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (campo === 'nombre' && valor.trim() === '') {
      error = 'El nombre es obligatorio'
    } else if(campo === 'email' && valor.trim() === ''){
      error = 'El email es obligatorio'
      setContacto({...contacto, [campo]: ''})
    } else if (campo === 'email' && !emailRegex.test(valor)) {
        error = 'El formato del email no es válido'
    } else if (campo === 'mensaje' && valor.trim() === '') {
      error = 'El mensaje es obligatorio'
    }
    return error
  }



  const handleChange = (e) => {
    const { name, value } = e.target
    setContacto({...contacto, [name]: value})
    const error = validarCampos(name, value)
    setErrores({...errores, [name]: error})
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrores = {}
    Object.keys(contacto).forEach((key) => {
      const error = validarCampos(key, contacto[key])
      if(error) {
        newErrores[key] = error
      }
    })
    setErrores(newErrores)
    if (Object.keys(newErrores).length === 0) {
      setMensajeExito(true)
      setTimeout(() => {
        setMensajeExito(false)
        setContacto(camposVacios)
      }, 2000);
    }
  }

  return (
    <>
      <div id="main-contacto">
        <div id="contenedor-titulo-contacto">
            <h1>Contactanos</h1>
        </div>
        <div id="contenedor-contacto">
            <form id="contenedor-form-contacto" onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={contacto.nombre} onChange={handleChange} />
                    {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
                </div>
                <div className="campo-formulario">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email"  value={contacto.email} onChange={handleChange} />
                    {errores.email && <p style={{ color: 'red' }}>{errores.email}</p>}
                </div>
                <div className="campo-formulario" id="contenedor-mensaje-contacto">
                    <label id="mensaje-label" htmlFor="mensaje">Mensaje</label>
                    <textarea id="mensaje" name="mensaje"  value={contacto.mensaje} rows="4" onChange={handleChange} ></textarea>
                    {errores.mensaje && <p style={{ color: 'red' }}>{errores.mensaje}</p>}
                </div>
                <div className="campo-formulario">
                    <button id="boton-contacto" type="submit">Enviar</button>
                </div>
                {mensajeExito && <p id="mensaje-visible">Datos enviados correctamente </p>}
            </form>
        </div>
      </div>

    </>
  )
}

export default Contacto;