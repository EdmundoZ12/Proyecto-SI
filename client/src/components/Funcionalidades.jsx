import {  useNavigate, Form, redirect } from "react-router-dom"
import {eliminarFuncionalidad} from "../api/Funcionalidad"

export async function action({params}){
  await eliminarFuncionalidad(params.funcionalidadId)
 return redirect('/funcionalidad')
}

const Funcionalidades = ({funci}) => {
  const nav=useNavigate();
  return (
    
          <tr  className="border-b ">
                  <td className="p-6 space-y-2" >
                        <p className="text-gray-800 uppercase font-bold">{funci.nombre}</p> 
                  </td>
                  <td className="p-6">
                      <p className="text-gray-800 uppercase font-bold">{funci.descripcion} </p>
                  </td>

                  <td className="p-6 flex gap-3">
                        <button 
                            type="button"
                            className="text-blue-600 hover:text-blue-700 uppercase font-bold"
                            onClick={()=> nav(`/funcionalidad/${funci.id}/editar`)}
                        >
                            Editar
                        </button>
                        <Form
                      method="post"
                      action={`/funcionalidad/${funci.id}/eliminar`}
                      onSubmit={(e)=>{
                        if(!confirm('¡Deseas eliminar este Funcionalidad?')){
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

export default Funcionalidades