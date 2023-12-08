import "./nosotros.css"
import imagen from "../../assets/nosotros.png"
const Nosotros = () => {
  return (
    <section id="nosotros" className="nosotros">
        <div className="fila">
            <div className="col">
                <img src={imagen} alt=""/>
            </div>
            <div className="col">
                <div className="contenedor-titulo">
                    <div className="numero">
                        01
                    </div>
                    <div className="info">
                        <span className="frase">LA MEJOR EXPERIENCIA</span>
                        <h2>NOSOTROS</h2>
                    </div>
                </div>
                <p className="p-especial">Somos más que un gimnasio.</p>
                <p>Al elegir nuestro gimnasio, no solo eliges un lugar para ejercitarte; eliges formar parte de una comunidad que se preocupa por tu éxito y bienestar. Estamos aquí para apoyarte en cada paso de tu viaje fitness.

Bienvenido a un lugar donde la dedicación, la pasión y la excelencia se encuentran. ¡Estamos emocionados de ser parte de tu camino hacia un mejor "tú"!</p>
            </div>
        </div>
        
    </section>
  )
}

export default Nosotros
