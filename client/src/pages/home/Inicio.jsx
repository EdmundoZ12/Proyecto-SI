import React from 'react'
import { FaChevronCircleDown } from "react-icons/fa";
import fondoImagen from "../../assets/fondo.jpg"
const Inicio = () => {

    const inicio={
        height:'100vh',
        background:`linear-gradient(rgba(0,1,3,5),rgba(0,0,0,.7)), url(${fondoImagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        color:' #fff',
        position: 'relative'
    }
    const contenido={
        maxWidth: '1100px',
        margin: 'auto',
    }
    const info={
        width:'fit-content',
        margin: 'auto',
        position: 'absolute',
        top:'50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
    }
    const opciones={
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
    }

    const opcion={
        bordertop: '2px solid #797e8e',
        padding: '7px',
        color: '#797e8e',
        margin: '0 20px',
    }

    const btn={
        width: '50px',
        margin: 'auto',
        height: '50px',
        border: '2px solid #ff1133',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        color: '#ff1133',
        marginTop: '50px',
        textDecoration: 'none',
    }

  return (
   <section id="inicio" className="inicio"style={inicio}>
    <div style={contenido}>
        <div style={info}>
            <h2 style={{fontSize: '4rem',  letterSpacing: '3px'}}>HAZ QUE <span style={{color:'red'}}>OCURRA</span></h2>
            <p style={{ margin: '20px', color: '#797e8e',fontSize: '16px',letterSpacing: '3px',textTransform: 'uppercase'}}>Triunfar es más fácil de lo que piensas!</p>
            <a href="#nosotros" style={btn}>
                <i><FaChevronCircleDown /></i>
            </a>
        </div>
        <div style={opciones} className=' hidden lg:flex'>
          <div style={opcion}>01.FITNESS</div>
          <div style={opcion}>02.CROSSFIT</div>
          <div style={opcion}>03.BOXING</div>
          <div style={opcion}>04.CYCLING</div>
          <div style={opcion}>05.YOGA</div>
          <div style={opcion}>06.CARDIO</div>
        </div>
    </div>
   </section>
  )
}

export default Inicio
