import { useLoaderData, useNavigate } from "react-router-dom"
import{obtenerUsuario} from "../api/Usuario"
import Usuario from "../components/Usuario"





export function loader(){
  const hh=obtenerUsuario()
  
  return hh
}



const Index = () => {
  
  const usuarios= useLoaderData()
  
  return (
    <div >
      <h1 className="font-black text-center text-4xl text-blue-900">Lista de Usuario</h1>
      <p className="mt-3 text-center">Administra tus clientes </p>

      {usuarios.length?(
          <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Usuario</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user=>(
                <Usuario
                    user={user}
                    key={user.id}
                
                />
              ))}
            </tbody>
          </table>

      ):(
        <p>
          No hay Usuarios aun
        </p>
      )}

    </div>
  )
}

export default Index