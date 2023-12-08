import "./footer.css"
import logo from "../../assets/Borcelle.png"
const Footer = () => {
  return (
    <footer>
        <div className="info">
        <img src={logo} alt="" style={{width:"4rem", height:"auto"}} />
        <p>2023 - <span style={{color:'red'}} >WILSON FITNESS GYM</span> Todos los derechos reservados</p>
        </div>
    </footer>
  )
}

export default Footer
