import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
    <footer>
        <h3>&copy; Copyright 2025</h3>
        <p>Seguinos!!!</p>
        <Link to="https://www.facebook.com/" target="_blank">
            <img src="/img/facebook.jpeg" id="facebook" alt="Logo de facebook" />
        </Link>
        <Link to="https://www.instagram.com/" target="_blank">
            <img src="/img/instagram.jpeg" id="instagram" alt="Logo de instagram" />
        </Link>
        <Link to="https://www.youtube.com/" target="_blank">
            <img src="/img/youtube.jpg" id="youtobe" alt="Logo de youtobe" />
        </Link>       
    </footer>
   </>
  )
}

export default Footer