import React from 'react'
import './Nosotros.css'

const Nosotros = () => {
    return (
        <>
            <div id="main-nosotros">
                <div id="contenedor-titulo-nosotros">
                    <h1>Sobre nuestra empresa</h1>
                </div>
                <div id="contenedor-nosotros" >
                    <section>
                        <h2>Nuestra Misión</h2>
                        <br />
                        <p>Nuestra empresa de ropa online ofrece productos de moda con calidad y estilo a través de una experiencia de compra cómoda y satisfactoria, cubriendo las necesidades de un público específico, mientras buscamos un crecimiento sostenible y establecemos relaciones duraderas con clientes y proveedores.</p>
                        <div>
                            <img src="/img/nosotros.jpg" alt="Imagen de la empresa" />
                        </div>
                        <h2>Vision</h2>
                        <br />
                        <p>Ser reconocida como la marca líder en su nicho, con un estilo definido y una propuesta de valor única ampliando la presencia en el mercado nacional e internacional, llegando a nuevos públicos y mercados a través de la plataforma online.</p>
                    </section>
                </div>
            </div>
        </>
     )
}

export default Nosotros