import "./galeria.css"
import f1 from "../../assets/f1.jpg"
import f2 from "../../assets/f2.jpg"
import f3 from "../../assets/f3.jpg"
import f4 from "../../assets/f4.jpg"
import f5 from "../../assets/f5.jpg"
import f6 from "../../assets/f6.jpg"

function Galeria() {
  return (
    <section className="galeria" id="galeria">
    <div className="contenido-seccion">
        <div className="contenedor-titulo">
            <div className="numero">
                04
            </div>
            <div className="info">
                <span className="frase">LA MEJOR EXPERIENCIA</span>
                <h2>GALERIA</h2>
            </div>
        </div>
        <div className="fila">
            <div className="col">
                <img src={f1} alt=""/>
            </div>
            <div className="col">
                <img src={f2} alt=""/>
            </div>
            <div className="col">
                <img src={f3} alt=""/>
            </div>
        </div>
        <div className="fila">
            <div className="col">
                <img src={f4} alt=""/>
            </div>
            <div className="col">
                <img src={f5} alt=""/>
            </div>
            <div className="col">
                <img src={f6} alt=""/>
            </div>
        </div>
    </div>
</section>
  )
}

export default Galeria
