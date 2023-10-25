import {GetUsuario, actualizarUsuario} from "../api/Usuario"
import Formulario from "../components/Formulario"
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import Error from "../components/Error"
export async function loader({params}){
    
  const user= await GetUsuario(params.usuarioId)

 
 
  return user
}

export async function action({request, params}){
  const formDate = await request.formData()

const edit=Object.fromEntries(formDate)

const errores=[]
if(Object.values(edit).includes('')){
  errores.push('todos los campos son obligatorios')
}

if(Object.keys(errores).length){
 return errores
}


await actualizarUsuario(params.usuarioId ,edit)
return redirect('/')
}


const EditarUsuario = () => {
  
  const navigate=useNavigate()
  const datos= useLoaderData()
  const errores=useActionData()
  
  
  return (
    <div>
    <h1 className="font-black text-4xl text-center text-blue-900">Editar Usuario</h1>
    <p className="text-center mt-3">Modifica los Datos del Usuario </p>
    <div className='flex justify-end'>
      <button className=' bg-blue-800 text-white px-3 py-1 uppercase'
        onClick={()=>navigate(-1)}>
        volver
      </button>
    </div>

    <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 '>
       {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)}
          <Form  method='post'>
          <Formulario
              cliente={datos}
          />
              <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' 
              value="Actualizar Usuario" />
          </Form>
              
          
    </div>
</div>
  )
}

export default EditarUsuario