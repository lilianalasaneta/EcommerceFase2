import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/Navbar'
import Footer from './componentes/Footer'
import Inicio from './componentes/INICIO/Inicio'
import Nosotros from './componentes/NOSOTROS/Nosotros'
import Carrito from './componentes/CARRITO/Carrito'
import Contacto from './componentes/CONTACTO/Contacto'
{/*import Alta from './componentes/ALTA/Alta'*/}





import Listado from './componentes/LISTADO/Listado'


function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <div className="contenedor-header">
              <div id="logo">
                  <img src="../public/img/logo.jpeg" alt="Logo de la tienda" />
              </div>
              <form action="" className="barra-busqueda">
                  <input type="text" placeholder="Buscar..." />
                  <span></span>
                  <input type="button" value="Buscar" />
              </form>
              <div>
                  <Link to="/carrito"><img src="../public/img/carrito-de-compras.png" alt="Carrito" /></Link>
                  {/*<span>(0)</span>*/}
              </div>
          </div>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/listado' element={<Listado />}/>
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='*' element={<Inicio />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
