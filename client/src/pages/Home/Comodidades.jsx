import "./comodidades.css"
import img from "../../assets/nosotros.png"
const comodidades = () => {
  return (
    <section id="comodidades" className="comodidades">
        <div className="fila">
            <div className="col">
                <img src={img} alt=""/>
            </div>
            <div className="col">
                <div className="contenedor-titulo">
                    <div className="numero">
                        03
                    </div>
                    <div className="info">
                        <span className="frase">LA MEJOR EXPERIENCIA</span>
                        <h2>COMODIDADES</h2>
                    </div>
                </div>
                <p className="p-especial">Descubre un mundo de comodidades que hacen que tu estancia sea incomparable</p>
                <ul>
                    <li><span>PILETA</span> - Sumérgete en el rejuvenecimiento total con nuestra piscina de primera clase. Después de tu entrenamiento, disfruta de un merecido descanso en este oasis de relajación.</li>
                    <li><span>WIFI GRATIS</span>  Mantente conectado y motivado con nuestro acceso WiFi gratuito. Accede a tus entrenamientos en línea, música o simplemente mantente en contacto mientras te enfocas en tus metas de bienestar.</li>
                    <li><span>ESTACIONAMIENTO GRATIS</span> Elimina la preocupación logística con nuestro estacionamiento gratuito. Tu viaje al gimnasio debería ser sin complicaciones desde el principio.</li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default comodidades
