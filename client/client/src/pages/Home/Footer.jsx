import React from 'react'
import logo from "../../assets/Borcelle.png"

const Footer = () => {
  const footer={
    backgroundColor: '#151623',
    padding: '30px 0'
  }
  const info={
    display: 'flex',
    maxWidth: '1100px',
    margin: 'auto',
    justifyContent: 'space-between',
    padding: '0 20px',
  }
  const redes={
    textDecoration: 'none',
        color: '#fff',
        display: 'inline-block',
        padding: '5px 8px',
        transition: 'color 0.3s', // Agregado para suavizar la transición
        fontSize:"2rem",
        width:"4rem"
  }
  const a={
    textDecoration: 'none',
    color: '#797e8e',
    display: 'inline-block',
    margin: '0 15px',
  }
    return (
    <footer style={footer}>
        <div style={info}>
        <img src={logo} alt="" style={{width:"4rem", height:"auto"}} />
        <p>2023 - <span style={{color:'red'}} >WILSON FITNESS GYM</span> Todos los derechos reservados</p>
        </div>
    </footer>
  )
}

export default Footer
