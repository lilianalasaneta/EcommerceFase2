import React, { useState, useEffect } from 'react';
import './Abm.css'

function Abm({ agregarRegistro, editarRegistro, registroSeleccionado, cancelarRegistro, quienLlamo}) {

  const camposVacios = {  
      id: '',
      nombre: '', 
      marca: '', 
      categoria: '', 
      stock: '0', 
      descripcion_corta: '', 
      descripcion_larga: '', 
      precio: '', 
      foto: '', 
      envio: false }

  const [producto, setProducto] = useState(registroSeleccionado)
  const [errores, setErrores] = useState({})



  const validarCampos = (campo, valor) => {
      let error = ''
      switch (campo) {
        case 'nombre':
          if (valor.trim() === '') {
          error = 'El nombre es obligatorio'
          }
          break

        case 'marca':
          if (valor.trim() === '') {
          error = 'La marca es obligatoria'
          }
          break

        case 'categoria':
          if (valor.trim() === '') {
          error = 'La categoria es obligatoria'
          }
          break

        case 'stock':

          if (valor == 0) {
            error = 'El stock es obligatorio'
          }else if (valor < 0) {
          error = 'El stock debe ser mayor a cero'
          }
          break   
      
        case 'descripcion_corta':
          if (valor.trim() === '') {
              error = 'La descripcion corta es obligatoria'
          }
          break  
      
        case 'precio':
          if (valor == 0) {
            error = 'El precio es obligatorio'
          }else if (valor < 0){
            error = 'El precio debe ser mayor a cero'
          }
          break      
      
        case 'foto':
          if (valor.trim() === '') {
              error = 'La foto es obligatoria'
          }
          break     

        default:
          break;
      }
      return error
  }



  const handleChange = (e) => {
    e.preventDefault()
    if(e.target.name === 'envio'){
        setProducto({...producto, envio: e.target.checked,})
    }else{
        const { name, value } = e.target
        setProducto({...producto, [name]: value,})
        const error = validarCampos(name, value)
        setErrores({...errores, [name]: error,})
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrores = {}
    Object.keys(producto).forEach((key) => {
        if(key !== 'envio'){
            const error = validarCampos(key, producto[key])
            if (error) {
                newErrores[key] = error
            }
        }

    })
    setErrores(newErrores)
    if (Object.keys(newErrores).length === 0) {
      if (quienLlamo === 'modi'){
        editarRegistro(producto)
      } else {
        agregarRegistro(producto)
      }
      setTimeout(() => {
        setProducto(camposVacios)
      }, 2000)
    }
  }



  const cancelar = (e) => {
    e.preventDefault()
    cancelarRegistro()
  }



  return (
    <> 
      <div id="contenedor-titulo-abm">
          <h1>Listado - ABM</h1>
      </div>
      <div id="contenedor-titulo-alta">
        <h2>Formulario de Registro</h2>
      </div>
      <div className="contenedor-alta">
        <form id="contenedor-form-alta"  onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" value={producto.nombre} onChange={handleChange}/>
              {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="marca">Marca</label>
              <input type="text" id="marca" name="marca" value={producto.marca} onChange={handleChange}/>
              {errores.marca && <p style={{ color: 'red' }}>{errores.marca}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" name="categoria" value={producto.categoria} onChange={handleChange}/>
              {errores.categoria && <p style={{ color: 'red' }}>{errores.categoria}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" step="1" min="0" max="99999" value={producto.stock} onChange={handleChange}/>
              {errores.stock && <p style={{ color: 'red' }}>{errores.stock}</p>}
          </div>
        <div className="form-group">
              <label htmlFor="descripcion_corta">Descripción corta</label>
              <input type="text" id="descripcion_corta" name="descripcion_corta" value={producto.descripcion_corta} onChange={handleChange}/>
              {errores.descripcion_corta && <p style={{ color: 'red' }}>{errores.descripcion_corta}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="descripcion-larga">Descripción larga</label>
              <textarea id="descripcion_larga" name="descripcion_larga" rows="4" value={producto.descripcion_larga} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input type="number" id="precio" name="precio" step="0.01" min="0.00" max="99999.99" value={producto.precio} onChange={handleChange}/>
              {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="foto">Foto</label>
              <input type="text" id="foto" name="foto" value={producto.foto} onChange={handleChange}/>
              {errores.foto && <p style={{ color: 'red' }}>{errores.foto}</p>}
          </div>
          <div className="form-group">
              <label htmlFor="envio">Envío sin cargo</label>
              <input type="checkbox" id="envio" name="envio" checked={producto.envio} onChange={handleChange}/>
          </div>
          <div id="botones">
              <button id="btn-guardar" type="submit">Guardar</button>
              <button id="btn-cancelar" type="button" onClick={cancelar}>Cancelar</button>
          </div>
        </form>
    </div>
  </>

  )
}

export default Abm
