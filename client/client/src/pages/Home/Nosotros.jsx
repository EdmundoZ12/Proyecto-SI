import React from 'react'
import imagen from "../../assets/nosotros.png"

const Nosotros = () => {
  const nosotros={
    maxWidth: '1100px',
    margin: 'auto',
    height: '100vh',
    backgroundColor: '#dde1e',
    padding: '100px 20px',
  }
  const fila={
    display: 'flex',
    alignItems: 'center',
  }
  const col={
    width: '50%',
  }
  const i={
    width: '80%',
    display: 'block',
    margin: 'auto',
    marginBottom: '50px',
  }
  const titulo={
    display: 'flex',
    alignItems:'center',
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
    color: '#ff1133',
    fontSize: '18px',
    fontWeight: '600',
  }
  const p={
    fontWeight: 'bold',
  }
  const filaN={
    
  }
  const col1={
    
  }
  const col2={
    
  }

    return (
    
    <section id="nosotros" className="nosotros" style={nosotros}>
        <div style={fila} className=' flex flex-col lg:flex-row'>
            <div style={col} className=' lg:w-1/2'>
                <img src={imagen} style={i} alt="nosotros" className=' mx-auto max-full lg:max-w-2xl' />
            </div>
            <div style={col} >
                <div style={titulo}>
                    <div style={numero}>
                        01
                    </div>
                    <div style={info}>
                        <span style={frase}>LA MEJOR EXPERIENCIA</span>
                        <h2 style={{fontSize: '3rem'}}>Nosotros</h2>
                    </div>
                </div>
                <p style={p}>Somos más que un gimnasio.</p>
                <p style={{marginBottom: '10px',lineHeight: '28px'}}>Al elegir nuestro gimnasio, no solo eliges un lugar para ejercitarte; eliges formar parte de una comunidad que se preocupa por tu éxito y bienestar. Estamos aquí para apoyarte en cada paso de tu viaje fitness.

Bienvenido a un lugar donde la dedicación, la pasión y la excelencia se encuentran. ¡Estamos emocionados de ser parte de tu camino hacia un mejor "tú"!</p>
            </div>
        </div>
        <hr style={{marginBottom: '30px'}}/>
        <div style={filaN}>
            <div style={col1}>
                <span style={frase}>
                    <span style={{color:'red'}}>ENTRENA</span> DIFERENTE
                </span>
                <h2 style={{fontSize: '2.5rem'}}>ENTRENA <span style={{color:'red'}}>GRATIS</span> HOY!</h2>
            </div>
            
        </div>
    </section>
      
    
  )
}

export default Nosotros
