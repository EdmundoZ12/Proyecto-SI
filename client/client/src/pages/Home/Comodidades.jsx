import React from 'react'
import img from "../../assets/nosotros.png"

const Comodidades = () => {
    const comodidades={
        maxWidth: '1100px',
    margin: 'auto',
    backgroundColor: '#dde1e9',
    padding: '100px 20px',
    }
    const fila={
        display: 'flex',
        alignItems: 'center',
    }
    const col={
        width: '50%'
    }
    const imagen={
        width: '80%',
        display: 'block',
        margin: 'auto',
        marginBottom: '50px',
    }
    const titulo={
        display: 'flex',
        alignItems: 'center',
    }
    const numero={
        color: '#ff1133',
    fontWeight: 'bold',
    display: 'block',
    fontSize: '5rem',
    }
    const info={
        marginLeft: '30px'
    }
    const frase={
        color: '#ff1133'
    }
    const h2={
        fontSize: '3rem',
    }
    const li={
        marginBottom: '20px',
        color: '#1f283e'
    }
    const p={
        fontWeight: 'bold',
    }
    const span={
        fontWeight: 'bold',
    color: '#ff1133',
    }
  return (
    <section id="comodidades" className="comodidades" style={comodidades}>
        <div style={fila}>
            <div style={col}>
                <img style={imagen} src={img} alt=""/>
            </div>
            <div style={col}>
                <div style={titulo} class="contenedor-titulo">
                    <div style={numero} class="numero">
                        03
                    </div>
                    <div style={info} class="info">
                        <span style={frase} class="frase">LA MEJOR EXPERIENCIA</span>
                        <h2 style={h2}>COMODIDADES</h2>
                    </div>
                </div>
                <p style={p} class="p-especial">Descubre un mundo de comodidades que hacen que tu estancia sea incomparable</p>
                <ul>
                    <li style={li}><span style={span}>PILETA</span> - Sumérgete en el rejuvenecimiento total con nuestra piscina de primera clase. Después de tu entrenamiento, disfruta de un merecido descanso en este oasis de relajación.</li>
                    <li style={li}><span style={span}>WIFI GRATIS</span> - Mantente conectado y motivado con nuestro acceso WiFi gratuito. Accede a tus entrenamientos en línea, música o simplemente mantente en contacto mientras te enfocas en tus metas de bienestar.</li>
                    <li style={li}><span style={span}>ESTACIONAMIENTO GRATIS</span> Elimina la preocupación logística con nuestro estacionamiento gratuito. Tu viaje al gimnasio debería ser sin complicaciones desde el principio.</li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Comodidades
