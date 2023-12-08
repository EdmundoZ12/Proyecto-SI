import React from 'react'
import f1 from "../../assets/f1.jpg"
import f2 from "../../assets/f2.jpg"
import f3 from "../../assets/f3.jpg"
import f4 from "../../assets/f4.jpg"
import f5 from "../../assets/f5.jpg"
import f6 from "../../assets/f6.jpg"
import fondoImagen from "../../assets/fondo-galeria.jpg"

const Galeria = () => {

    const galeria={
        color: '#fff',
        background:`linear-gradient(rgba(0,1,3,5),rgba(0,0,0,.7)), url(${fondoImagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        padding: '100px 0'
    }
    const contenido={
        maxWidth: '1100px',
    margin: 'auto',
    padding: '0 20px',
    }
    const titulo={
        display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    }
    const numero={
        color: '#ff1133',
        fontWeight: 'bold',
        display: 'block',
        fontSize: '5rem',
    }
    const info={
        marginLeft: '30px',
    }
    const frase={
        color: '#ff1133' 
    }
    const h2={
        fontSize: '3rem'
    }
    const fila={
        display: 'flex'
    }
    
    const imagen={
        width: '100%',
    display: 'block',
    }
  return (
    <section className="galeria" id="galeria" style={galeria}>
    <div  style={contenido}>
        <div  style={titulo}>
            <div style={numero}>
                04
            </div>
            <div  style={info}>
                <span style={frase} >LA MEJOR EXPERIENCIA</span>
                <h2 style={h2}>GALERIA</h2>
            </div>
        </div>
        <div style={fila} >
            <div >
                <img style={imagen} src={f1} alt=""/>
            </div>
            <div  >
                <img  style={imagen}src={f2} alt=""/>
            </div>
            <div >
                <img style={imagen}src={f3} alt=""/>
            </div>
        </div>
        <div style={fila}>
            <div  >
                <img style={imagen}src={f4} alt=""/>
            </div>
            <div  >
                <img style={imagen}src={f5} alt=""/>
            </div>
            <div  >
                <img style={imagen}src={f6} alt=""/>
            </div>
        </div>
      </div>
    </section>

  )
}

export default Galeria
