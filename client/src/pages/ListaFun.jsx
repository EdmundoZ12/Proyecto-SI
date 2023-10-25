import { useLoaderData, useNavigate } from "react-router-dom"
import {obtenerFuncionalidad} from "../api/Funcionalidad"
import Funcionalidades from "../components/Funcionalidades"

export function loader(){
    const fun=obtenerFuncionalidad()
    console.log(fun)
    return fun
}

const ListaFun = () => {

    const funcionalidad=useLoaderData()

  return (
    <div>
         <h1 className="font-black text-4xl text-center text-blue-900">Lista de Funcionalidades</h1>
         <p className=" text-center mt-3">Administra tus Funcionalidades</p>

         {funcionalidad.length?(
            
            <table className="w-full bg-white shadow mt-5 table-auto">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Descripcion</th>
                        <th className="p-2">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionalidad.map(funci=>(
                        <Funcionalidades
                            funci={funci}
                            key={funci.id}
                        />
                    ))}
                </tbody>
            </table>

            ):(
                <p>
                No hay funcionalidades aun
                </p>
            )}
                </div>
            )
            }

export default ListaFun