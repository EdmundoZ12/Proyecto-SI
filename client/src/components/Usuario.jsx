import {  useNavigate, Form, redirect } from "react-router-dom"
import EditarUsuario from "../pages/EditarUsuario";
import {eliminarUsuario} from "../api/Usuario"

export async function action({params}){
   await eliminarUsuario(params.usuarioId)
  return redirect('/')
}


function Usuario({user}) {

    const nav=useNavigate();
  return (
   
        <tr  className="border-b ">
                  <td className="p-6 space-y-2" >
                        <p className="text-gray-600 "><span className="text-gray-800 uppercase font-bold">Nombre: </span>{user.nombre}</p>
                    <p className="text-gray-600 "><span className="text-gray-800 uppercase font-bold">Usuario: </span>{user.usuario}</p>
                    <p className="text-gray-600 "><span className="text-gray-800 uppercase font-bold">Carnet: </span>{user.ci}</p>
                  </td>
                  <td className="p-6">
                      <p className="text-gray-600 "><span className="text-gray-800 uppercase font-bold">Email: </span>{user.email}</p>
                      <p className="text-gray-600 "><span className="text-gray-800 uppercase font-bold">Telefono: </span>{user.telefono}</p>
                  </td>

                  <td className="p-6 flex gap-3">
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-700 uppercase font-bold"
                      onClick={()=> nav(`/usuario/${user.id}/editar`)}
                    >
                      Editar
                    </button>

                    <Form
                      method="post"
                      action={`/usuario/${user.id}/eliminar`}
                      onSubmit={(e)=>{
                        if(!confirm('¡Deseas eliminar este Usuario?')){
                          e.preventDefault()
                        }
                      }}
                    >
                        <button 
                          type="submit"
                          className="text-red-600 hover:text-red-700 uppercase font-bold"
                        >
                          Eliminar
                        </button>
                    </Form>
                    
                  </td>
                </tr>
    
  )
}

export default Usuario