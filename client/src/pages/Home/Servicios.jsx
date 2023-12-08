import "./servicios.css"
import img from "../../assets/servicios.png" 
import { FaPersonWalking } from "react-icons/fa6";
import { CiDumbbell } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaMitten } from "react-icons/fa";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaBicycle } from "react-icons/fa";

const Servicios = () => {
  return (
    <section className="servicios" id="servicios">
    <div className="contenido-seccion">
        <div className="fila">
            <div className="col">
                <div className="contenedor-titulo">
                    <div className="numero">
                        02
                    </div>
                    <div className="info">
                        <span className="frase">LA MEJOR EXPERIENCIA</span>
                        <h2>SERVICIOS</h2>
                    </div>
                </div>
                <p className="p-especial">Las mejores clases para que empiezes tu vida saludable</p>
                <p>Descubre la excelencia en cada momento con nuestra oferta incomparable de servicios. En nuestro espacio, no solo te ofrecemos actividades, sino una experiencia completa diseñada para superar tus expectativas y brindarte lo mejor en cada clase.</p>
            </div>
            <div className="col">
                <img src={img} alt=""/>
            </div>
        </div>
    </div>
    <div className="info-servicios">
        <table>
            <tbody>
            <tr>
                <td>
                    <i ><FaPersonWalking /></i>
                    <h3><span className="txtRojo">Clases </span> de Fitness</h3>
                    <p>Únete al fitness y descubre cómo el movimiento puede ser la clave para una vida saludable</p>
                </td>
                <td>
                    <i ><CiDumbbell /></i>
                    <h3><span className="txtRojo">Clases </span> de Crossfit</h3>
                    <p>¡Desafía tus límites, descubre el CrossFit y transforma tu vida!</p>
                </td>
                <td>
                    <i className="fa-solid fa-mitten"><FaMitten/></i>
                    <h3><span className="txtRojo">Clases </span> de Boxeo</h3>
                    <p>¡Despierta tu fuerza interior, descubre el boxeo y transforma tu cuerpo y mente!</p>
                </td>
            </tr>
            <tr>
                <td>
                    <i className="fa-solid fa-clock"><FaHeartCircleBolt/></i>
                    <h3><span className="txtRojo">Clases </span> de Cardio</h3>
                    <p>¡Eleva tu energía! Únete a nosotros para descubrir cómo el cardio puede transformar tu salud y tu vitalidad.</p>
                </td>
                <td>
                    <i className="fa-solid fa-heart-circle-bolt"><FaRegClock/></i>
                    <h3><span className="txtRojo">Clases </span> de Yoga</h3>
                    <p>¡Conéctate contigo mismo y con la comunidad! Descubre el yoga y transforma tu vida.</p>
                </td>
                <td>
                    <i className="fa-solid fa-bicycle"><FaBicycle/></i>
                    <h3><span className="txtRojo">Clases </span> de Ciclismo</h3>
                    <p>Entrena sobre una bicicleta estática para obtener una excelente condición física y tonificar tu cuerpo.</p>
                </td>
            </tr>
            </tbody>
           
        </table>
    </div>
</section>
  )
}

export default Servicios
