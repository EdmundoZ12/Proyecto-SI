import FomuFunci from "../components/FomuFunci"
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Error from '../components/Error';
import {agregarFuncionalidad} from "../api/Funcionalidad"

export async function action({request}){
  const formDate = await request.formData()
  
  const datos=Object.fromEntries(formDate)
  
  const errores=[]
  if(Object.values(datos).includes('')){
    errores.push('todos los campos son obligatorios')
  }
  
  if(Object.keys(errores).length){
   return errores
  }
  
  
  await agregarFuncionalidad(datos)
  
  return redirect('/funcionalidad')
  }
 const NuevoFun = () => {

  const errores=useActionData()
  const navigate=useNavigate()
  return (
    <div>
      <h1 className="font-black text-4xl text-center text-blue-900">Nuevo Funcionalidad</h1>
          <p className=" text-center mt-3">llena todos los campos </p>
          <div className='flex justify-end'>
            <button className=' bg-blue-800 text-white px-3 py-1 uppercase'
              onClick={()=>navigate(-1)}>
              volver
            </button>
          </div>

          <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 '>
               {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)}
                <Form  method='post'>
                <FomuFunci/>
                    <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' 
                    value="registrar" />
                </Form>
                    
                
          </div>
    </div>
  )
}

export default NuevoFun