import React from 'react'
import img from "../../assets/servicios.png" 
import { FaPersonWalking } from "react-icons/fa6";
import { CiDumbbell } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaMitten } from "react-icons/fa";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaBicycle } from "react-icons/fa";
import fondoImagen from "../../assets/fondo-servicios.jpg" 
function Servicios() {
    const servicios={
        color: '#fff',
        position: 'relative'
    }
    const contenedor={
        background:`linear-gradient(rgba(0,14,41,.6),rgba(0,7,78,0.7)), url(${fondoImagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        margin: 'auto',
        padding: '0 20px',
    }
    const fila={
        maxWidth: '1100px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 0'
    }
    const col={
        width: '50%',
    }
    const imagen={
        display: 'block',
        width: '50%',
        margin: 'auto',
    }
    const titulo={
        display: 'flex',
    alignItems: 'center',
    }
    const info={
        marginLeft: '30px',  
    }
    const numero={
        color: '#ff1133',
    fontWeight: 'bold',
    display: 'block',
    fontSize: '5rem',
    }
    const frase={
        color: '#ff1133',
    }
    const p={
        fontWeight: 'bold'
    }
    const infoS={
        maxWidth: '800px',
        margin: 'auto',
    }
    const table={
        textAlign: 'center',
    backgroundColor: '#fff',
    color: '#1f283e',
    borderCollapse: 'collapse',
    position: 'relative',
    bottom: '100px',
    }
    const td={
        padding: '30px',
    border: '1px solid #dde1e9'
    }
    const h3={
        marginBottom: '20px',
    textTransform: 'uppercase'
    }
    const i={
        color: '#ff1133',
        fontSize: '2.5rem',
        marginBottom: '20px', 
    }
  return (
  <section style={servicios} id='servicios' className='servicios'>
    <div style={contenedor}>
    <div style={fila}>
            <div style={col}>
                
            </div>
            <div style={col}>
                <div style={titulo}>
                    <div style={numero}>
                        02
                    </div>
                    <div style={info}>
                        <span style={frase}>LA MEJOR EXPERIENCIA</span>
                        <h2 style={{fontSize: '3rem'}}>Servicios</h2>
                    </div>
                </div>
                <p style={p}>Las mejores clases para que empiezes tu vida saludable</p>
                <p style={{marginBottom: '10px',lineHeight: '28px'}}>Descubre la excelencia en cada momento con nuestra oferta incomparable de servicios. En nuestro espacio, no solo te ofrecemos actividades, sino una experiencia completa diseñada para superar tus expectativas y brindarte lo mejor en cada clase.</p>
            </div>
            <div>
            <img style={imagen} src={img} alt="" />
        </div>
        </div>
       
    </div>
     <div style={infoS}>
        <table style={table}>
            <tbody>
            <tr>
                <td style={td}>
                    <i style={i}><FaPersonWalking /></i>
                    <h3 style={h3}><span style={{color:'red'}}>Clases </span>de Fitness</h3>
                    <p style={{lineHeight: '30px'}}>Únete a nuestra comunidad de fitness y descubre cómo el movimiento puede ser la clave para una vida saludable y plena.

</p>
                </td>
                <td style={td}>
                    <i style={i}><CiDumbbell /></i>
                    <h3 style={h3}><span style={{color:'red'}}>Clases </span>de Crossfit</h3>
                    <p style={{lineHeight: '30px'}}>¡Desafía tus límites, descubre el CrossFit y transforma tu vida!</p>
                </td>
                <td style={td}>
                    <i style={i}><FaMitten /></i>
                    <h3 style={h3}><span style={{color:'red'}}>Clases </span>de Boxeo</h3>
                    <p style={{lineHeight: '30px'}}>¡Despierta tu fuerza interior, descubre el boxeo y transforma tu cuerpo y mente!</p>
                </td>
            </tr>
            <tr>
            <td style={td}>
                    <i style={i}><FaHeartCircleBolt /></i>
                    <h3 style={h3}><span style={{color:'red'}}>Clases </span>de Cardio</h3>
                    <p style={{lineHeight: '30px'}}>¡Eleva tu ritmo, eleva tu energía! Únete a nosotros para descubrir cómo el cardio puede transformar tu salud y tu vitalidad.</p>
                </td>
                <td style={td}>
                    <i style={i}><FaRegClock /></i>
                    <h3 style={h3}><span style={{color:'red'}}>Clases </span>de Yoga</h3>
                    <p style={{lineHeight: '30px'}} >¡Conéctate contigo mismo y con la comunidad! Descubre el yoga y transforma tu vida.</p>
                </td>
                <td style={td}>
                    <i style={i}><FaBicycle /></i>
                    <h3 style={h3}><span style={{color:'red'}}>Clases </span>de Cycling</h3>
                    <p style={{lineHeight: '30px'}}>Entrena sobre una bicicleta estática para obtener una excelente condición física y tonificar tu cuerpo.</p>
                </td>
            </tr>
            </tbody>
           
        </table>
     </div>
  </section>
  )
}

export default Servicios
