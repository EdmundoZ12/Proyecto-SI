import {Link} from 'react-router-dom'
import './menu.scss'
import{menu} from "../../Datos"
const Menu = () => {
  return (
    <div className='menu'>
      {menu.map(item=>(

      
        <div className='item' key={item.id}>
        <span className='TiTulo'>{item.titulo}</span>
        {item.lista.map((lista)=>(

          <Link to={'/a'+lista.URL} className='listaItem' key={lista.id}>
          <img src={lista.icono} alt="" />
          <span className='lista'>{lista.titulo}</span>
          </Link>

        ))}
        
       
      </div>

      ))}
     

    </div>
  )
}

export default Menu