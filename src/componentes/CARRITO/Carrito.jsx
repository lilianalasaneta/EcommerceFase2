
import './Carrito.css'
import  {useStateLocalStorage} from '../../Hooks/useStateLocalStorage'
import servicioCarrito from '../../servicios/carrito'
import React, { useState} from 'react'
import VentanaModal from '../VENTANAMODAL/VentanaModal'

const Carrito = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const [idParaEliminar, setIdParaEliminar] = useState(null)
  const [nombreParaEliminar, setNombreParaEliminar] = useState(null)
  const [preguntaAVisualizar, setPreguntaAVisualizar] = useState(null)
  const [tituloAVisualizar, setTituloAVisualizar] = useState(null)
  const [mensajeVisible, setMensajeVisible] = useState(false)
  const [mensajeCartel, setMensajeCartel] = useState('')
  const [carrito, setCarrito] = useStateLocalStorage('carrito', [] )


  const mostrarMensaje = () => {
      setMensajeVisible(true)
      setTimeout(() => {
        setMensajeVisible(false)
        setMensajeCartel('')
      }, 2000)
  }
  



  function borrarCarrito() {
    setModalVisible(true)
    setIdParaEliminar(-1)
    setNombreParaEliminar('')
    setPreguntaAVisualizar('¿Está seguro que quiere eliminar todos los productos del carrito')
    setTituloAVisualizar('Confirmar eliminación del carrito')
  }



  async function generarPedido() {
    setModalVisible(true)
    setIdParaEliminar(null)
    setNombreParaEliminar('')
    setPreguntaAVisualizar('¿Está seguro de generar el pedido')
    setTituloAVisualizar('Confirmar generar el pedido')
  }



  function incrementarItem(id) {
    const carritoClon = [...carrito]
    const producto = carritoClon.find(p => p.id == id)
    if(producto.cantidad < producto.stock) {
      producto.cantidad++
      setCarrito(carritoClon)
    }
  }




  function decrementarItem(id) {
    const carritoClon = [...carrito]
    const producto = carritoClon.find(p => p.id == id)
    if(producto.cantidad > 1) {
        producto.cantidad--
        setCarrito(carritoClon)
    }
  }  




  function borrarItem(id, nombre) {
    setModalVisible(true)
    setIdParaEliminar(id)
    setNombreParaEliminar(nombre)
    setPreguntaAVisualizar('¿Está seguro de borrar del carrito el producto ')
    setTituloAVisualizar('Confirmar eliminación')
  }  



  const handleModalClose = () => {
    setModalVisible(false)
    setIdParaEliminar(null)
    setNombreParaEliminar(null)
    setPreguntaAVisualizar(null)
    setTituloAVisualizar(null)
  }



  const handleConfirm = async () => {
    if(idParaEliminar > 0){
      const carritoClon = [...carrito]
      const index = carritoClon.findIndex(p => p.id == idParaEliminar)
      carritoClon.splice(index, 1)
      setCarrito(carritoClon)
      setMensajeCartel('Producto eliminado del carrito exitosamente!!!')
    }else if(idParaEliminar == -1){
      setCarrito([])
      setMensajeCartel('Carrito eliminado exitosamente!!!')
    }else{
      const pedido2 = { fyh: new Date().toLocaleString(), pedido: carrito }
      await servicioCarrito.enviar(pedido2)
      setCarrito([])
      setMensajeCartel('Pedido generado exitosamente!!!')
    }
    mostrarMensaje()
    setModalVisible(false);
    setIdParaEliminar(null);
    setNombreParaEliminar(null)
    setPreguntaAVisualizar(null)
    setTituloAVisualizar(null)
  }



  const handleUnBotonConfirm = () => {
      setModalVisible(false)
}

return (
  <>
    <div id="main-carrito">
      <div id="contenedor-titulo-carrito">
          <h1>Carrito de compras</h1>
      </div>
      { 
        mensajeVisible ?
            (<div id="mensaje-visible">
            {mensajeCartel}
            </div>)
            : ''
      }
       <div className="contenedor-carrito">
                 { carrito.length
                    ? <>
                        <button className="carrito__borrar__pedir carrito_borrar" onClick={borrarCarrito}>Borrar carrito</button>
                        <table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>nombre</th>
                              <th>precio</th>
                              <th>stock</th>
                              <th>cantidad</th>
                              <th>marca</th>
                              <th>foto</th>
                              <th>acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                              {
                                carrito.map((produc,i) =>
                                  <tr key={i}>
                                    <td  className="centrar">{produc.id}</td>
                                    <td>{produc.nombre}</td>
                                    <td  className="centrar">${produc.precio}</td>
                                    <td  className="centrar">{produc.stock}</td>
                                    <td>
                                        {produc.cantidad}
                                        <button className="btnIncDec" onClick={
                                          () => decrementarItem(produc.id)
                                        }>-</button>
                                        <button className="btnIncDec" onClick={
                                          () => incrementarItem(produc.id)
                                        }>+</button>
                                    </td>
                                    <td>{produc.marca}</td>
                                    <td><img width="75" src={produc.foto} alt={"foto de " + produc.nombre + ' ' + produc.marca} /></td>
                                    <td>
                                        <button className="btnBorrar" onClick={
                                            () => borrarItem(produc.id, produc.nombre)
                                        }>Borrar</button>
                                    </td>
                                  </tr>              
                              )}
                          </tbody>            
                        </table>
                        <button className="carrito__borrar__pedir carrito_pedir" onClick={generarPedido}>Generar pedido</button>
                      </>
                    : <h2>No se encontraron pedidos para mostrar</h2>
                  }
        </div>
        <VentanaModal
          isOpen={modalVisible}
          onClose={handleModalClose}
          onConfirm={handleConfirm}
          idParaBorrar={idParaEliminar}
          nombreParaBorrar = {nombreParaEliminar}
          pregunta={preguntaAVisualizar}
          titulo={tituloAVisualizar}
          unBoton={false}
          advertencia={handleUnBotonConfirm}
        />
      </div>
  </>
  )
}

export default Carrito


