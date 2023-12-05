import Comodidades from "./Home/Comodidades"
import Footer from "./Home/Footer"
import Galeria from "./Home/Galeria"
import Header from "./Home/Header"
import Inicio from "./Home/Inicio"
import Nosotros from "./Home/Nosotros"
import Servicios from "./Home/Servicios"


export default function Page() {
    return (
        <div>
            <Header/>
            <Inicio/>
            <Nosotros/>
            <Servicios/>
            <Comodidades/>
            <Galeria/>
            <Footer/>
        </div>
    )
}