import './Inicio.css'
import { useState, useEffect } from 'react'
import servicioProductos from '../../servicios/productos'
import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage'
import VentanaModal from '../VENTANAMODAL/VentanaModal';

const Inicio = () => {

  const [productos, setProductos] = useState([])
  const [ carrito, setCarrito ] = useStateLocalStorage('carrito', [])
  const [modalVisible, setModalVisible] = useState(false);
  const [idParaEliminar, setIdParaEliminar] = useState(null);
  const [nombreParaEliminar, setNombreParaEliminar] = useState(null);
  const [mensajeVisible, setMensajeVisible] = useState(false)
  const [mensajeCartel, setMensajeCartel] = useState('')

  useEffect(() => {
    ;( async () => {
          const productosAll = await servicioProductos.getAllProductos()
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



  const validarStock = (stockExistente, cantidadSolicitada) => {
    return (stockExistente - cantidadSolicitada)
  }



  function addCarrito(producto) {
    const carritoClon = [...carrito]
    const id = producto.id
    const productoExistente = carritoClon.find(p => p.id == id)
    if(!productoExistente) {
      producto.cantidad = 1
      if(validarStock(producto.stock, producto.cantidad) >= 0){
        carritoClon.push(producto)
        setCarrito(carritoClon)
        setMensajeCartel('Se agrego el producto al carrito')
        mostrarMensaje()
      }else{
        setModalVisible(true)
        setIdParaEliminar(null)
        setNombreParaEliminar(null)
      }
    } else {
      productoExistente.cantidad++
      if(validarStock(productoExistente.stock, productoExistente.cantidad) >= 0){
        const index = carritoClon.findIndex(p => p.id == id)
        carritoClon.splice(index, 1, productoExistente)
        setCarrito(carritoClon)
        setMensajeCartel('Se agrego el producto al carrito')
        mostrarMensaje()
      }else{
        setModalVisible(true)
        setIdParaEliminar(null)
        setNombreParaEliminar(null)
      }
    }
  }



  const handleUnBotonConfirm = () => {
    setModalVisible(false)
    setIdParaEliminar(null)
    setNombreParaEliminar(null)
  }



  const handleModalClose = () => {
    setModalVisible(false)
    setIdParaEliminar(null)
    setNombreParaEliminar(null)
   
  }



  const handleEliminarConfirm = () => {
    setModalVisible(false)
    setIdParaEliminar(null)
    setNombreParaEliminar(null)
  }

  return (
    <>

      <div id="main-inicio">
        <div id="contenedor-titulo-inicio">
          <h1>Productos</h1>
        </div>
        {
        mensajeVisible ?
            (<div id="mensaje-visible">
            {mensajeCartel}
            </div>)
            : ''
        }
        <div id="contenedor-card">
          {
            productos.length 
            ?
                productos.map((produc, i) => 
                  <div className="card" key={i}>
                      <div id="contenedor-campo-foto">
                          <img src= {produc.foto} alt={'foto de ' + produc.nombre + ' ' + produc.marca}  />
                      </div>
                      <div id="contenedor-demas-campos">
                          <p id="campo-nombre">{produc.nombre}</p>
                          <br />
                          <p>{produc.descripcion_corta}</p>
                          <br />
                          <p id="campo-precio">$ {produc.precio} </p>
                          <button type="button" id="comprar" onClick={() => addCarrito(produc)} >Comprar</button>
                      </div>
                  </div>
              )

          : ''
          }

        </div>
        <VentanaModal 
          isOpen={modalVisible}
          onClose={handleModalClose}
          onConfirm={handleEliminarConfirm}
          idParaBorrar={idParaEliminar}
          nombreParaBorrar = {nombreParaEliminar}
          pregunta={'La cantidad solicitada para agregar al carrito es mayor al stock existente'}
          titulo={'Informacion'}
          unBoton={true}
          advertencia={handleUnBotonConfirm}
        />
      </div>
    </>
  )
}

export default Inicio