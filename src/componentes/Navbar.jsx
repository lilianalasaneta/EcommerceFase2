import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li> <Link to="/inicio">Inicio</Link> </li>
          <li> <Link to="/listado">Listado-ABM</Link> </li>
          <li> <Link to="/carrito">Carrito</Link> </li>
          <li> <Link to="/nosotros">Nosotros</Link> </li>
          <li> <Link to="/contacto">Contacto</Link> </li>
        </ul>
      </nav>
   </>
  )
}

export default Navbar