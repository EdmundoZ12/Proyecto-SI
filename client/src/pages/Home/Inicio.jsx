import "./inicio.css"
import { FaChevronCircleDown } from "react-icons/fa";
const Inicio = () => {
  return (
    <section id="inicio" className="inicio">
        <div className="contenido-seccion">
            <div className="info">
                <h2>HAZ QUE <span className="txtRojo">OCURRA</span></h2>
                <p>Triunfar es más facil de lo que piensas!</p>
                <a href="#nosotros" className="btn-mas">
                <i><FaChevronCircleDown /></i>
                </a>
            </div>
            <div className="opciones">
                <div className="opcion">
                    01.FITNESS
                </div>
                <div className="opcion">
                    02.CROSSFIT
                </div>
                <div className="opcion">
                    03.BOXING
                </div>
                <div className="opcion">
                    04.BICICLETA
                </div>
                <div className="opcion">
                    05.YOGA
                </div>
                <div className="opcion">
                    06.CARDIO
                </div>
            </div>
        </div>
    </section>
  )
}

export default Inicio
