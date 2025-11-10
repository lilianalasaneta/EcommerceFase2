import React, { useState, useEffect } from 'react';
import './Listado.css'
import servicioProductos from '../../servicios/productos'
import Abm from '../ABM/Abm'
import VentanaModal from '../VENTANAMODAL/VentanaModal'

const Listado = () => {
 
  const camposVacios = {  
    id: '',
    nombre: '', 
    marca: '', 
    categoria: '', 
    stock: '', 
    descripcion_corta: '', 
    descripcion_larga: '', 
    precio: '', 
    foto: '', 
    envio: false }
 
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState(camposVacios)
    const [errores, setErrores] = useState({})
    const [mensajeVisible, setMensajeVisible] = useState(false)
    const [mensajeCartel, setMensajeCartel] = useState('')
    const [llamo, setLlamo] = useState('')
    const [productoSeleccionado, setProductoSeleccionado] =  useState(null)
    const [mostrarTabla, setMostrarTabla] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [idParaEliminar, setIdParaEliminar] = useState(null)
    const [nombreParaEliminar, setNombreParaEliminar] = useState(null)


    useEffect(() => {
      ;( async () => {
            const productosAll =  await servicioProductos.getAllProductos()
            setProductos(productosAll)
        })()
    },[])
  
  

    const mostrarMensaje = () => {
      setMensajeVisible(true)
      setTimeout(() => {
        setMensajeVisible(false)
        setMensajeCartel('')
      }, 2000); 
    }
 
    

    const agregarRegistro =  async (nuevoRegistro) => {
      const productoGuardado = await servicioProductos.guardarProducto(nuevoRegistro)
      const productosClon = [...productos]
      productosClon.push(productoGuardado)
      setProductos(productosClon)
      setMensajeCartel('Registro insertado exitosamente!!!')
      mostrarMensaje()
      setLlamo('')
      setMostrarTabla(true)
    }
  


    const editarRegistro = async (registroAActualizar) => {
      const productoActualizado = await servicioProductos.actualizarProducto(productoSeleccionado.id, registroAActualizar)
      const productosClon = [...productos]
      const index = productosClon.findIndex(p => p.id == productoActualizado.id)
      productosClon.splice(index, 1, productoActualizado)  
      setProductos(productosClon)          
      setMensajeCartel('Registro actualizado exitosamente!!!')
      mostrarMensaje()
      setLlamo('')
      setMostrarTabla(true)
    }
  
  

  const borrarRegistro = async (id, nombre) => {
    setModalVisible(true)
    setIdParaEliminar(id)
    setNombreParaEliminar(nombre)
  }
  


  const cancelarRegistro = () => {
    setLlamo('')
    setMostrarTabla(true)
  }
  


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
        if (valor < 0) {
          error = 'El stock debe ser igual o mayor a cero'
        }
        break   
    
      case 'descripcion_corta':
        if (valor.trim() === '') {
          error = 'La descripcion corta es obligatoria'
        }
        break  
    
      case 'precio':
        if (valor < 0) {
          error = 'El precio debe ser mayor a cero'
        }
        break      
    
      case 'foto':
        if (valor.trim() === '') {
          error = 'La foto es obligatoria'
        }
        break     

      default:
          break
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
    const newErrores = {};
    Object.keys(producto).forEach((key) => {
      if(key !== 'envio'){
          const error = validarCampos(key, producto[key]);
          if (error) {
              newErrores[key] = error;
          }
      }
    });
    setErrores(newErrores);
    if (Object.keys(newErrores).length === 0) {
      if (llamo === 'modi') {
        editarRegistro(producto)
      } else {
         agregarRegistro(producto)
      }
      setLlamo('')
      setMostrarTabla(true)
    }
  }
 


  const manejarAgregar = () => {
    setProductoSeleccionado(camposVacios)
    setLlamo('alta')
    setMostrarTabla(false)
  }
  


  const manejarEditar = (id) => {
    const registroSeleccionado = productos.find(p => p.id == id)
    setProductoSeleccionado(registroSeleccionado)
    setLlamo('modi')
    setMostrarTabla(false)
  }
  


  const handleUnBotonConfirm = () => {
    setModalVisible(false);
  }
 


  const handleEliminarConfirm = async () => {
    const productoEliminado = await servicioProductos.eliminarProducto(idParaEliminar)
    const productosClon = [...productos]   
    const index = productosClon.findIndex(p => p.id == productoEliminado.id)
    productosClon.splice(index, 1)
    setProductos(productosClon)
    setMostrarTabla(true)
    setMensajeCartel('Registro eliminado exitosamente!!!')
    mostrarMensaje()
    setModalVisible(false)
    setIdParaEliminar(null)
    setNombreParaEliminar(null)
  }



  const handleModalClose = () => {
    setModalVisible(false)
    setIdParaEliminar(null)
     setNombreParaEliminar(null)
  }


  return (
  <>
    {mostrarTabla ?
    (
      <div id='contenedor-gral-listado'>
        <div id="contenedor-titulo-listado">
            <h1>Listado - ABM</h1>
        </div>
        <div id="contenedor-listado">
          <div>
              <h2>Lista de productos disponibles</h2>
          </div>
        </div>
        <div id='contenedor-boton-listado'>
          <button type="button" id='btn-agregar' onClick={manejarAgregar}>Agregar Nuevo Producto</button>
        </div>

        { 
        mensajeVisible ?
            (<div id="mensaje-visible">
            {mensajeCartel}
            </div>)
            : ''
        }
 
        <div id='contenedor-tabla-productos'>
         
          {productos.length 
          ?
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Stock</th>
                  <th>Descripcion corta</th>
                  <th>Descripcion larga</th>
                  <th>Precio</th>
                  <th>Foto</th>
                  <th>Envio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
                <tbody>
                    {
                    productos.map((produc, id) => 
                      <tr key={id}>
                          <td> {produc.id} </td>
                          <td> {produc.nombre} </td>
                          <td> {produc.marca} </td>
                          <td> {produc.categoria} </td>
                          <td> {produc.stock} </td>
                          <td> {produc.descripcion_corta} </td>
                          <td> {produc.descripcion_larga} </td>
                          <td> {produc.precio} </td>
                          <td><img src={produc.foto} alt='Foto del producto' width="75"/></td>
                          <td>{produc.envio? 'Si':'No'}</td>
                        <td id='acciones'>
                          <button  id='btn-editar' onClick={() => manejarEditar(produc.id)}>Editar</button>
                          <button  id='btn-borrar'  onClick={() => borrarRegistro(produc.id, produc.nombre)}>Eliminar</button>
                        </td>
                      </tr>
                      )}
                  </tbody>
            </table>
          : ''}
        </div>

        <VentanaModal
          isOpen={modalVisible}
          onClose={handleModalClose}
          onConfirm={handleEliminarConfirm}
          idParaBorrar={idParaEliminar}
          nombreParaBorrar = {nombreParaEliminar}
          pregunta={'¿Esta seguro de eliminar el producto '}
          titulo={'Confirmar eliminación'}
          unBoton={false}
          advertencia={handleUnBotonConfirm}
        />
      </div>
    )
    :
      <Abm
        agregarRegistro={agregarRegistro}
        editarRegistro={editarRegistro}
        registroSeleccionado={productoSeleccionado}
        cancelarRegistro={cancelarRegistro}
        quienLlamo={llamo}
      /> 
    }
  </>

  )
}

export default Listado