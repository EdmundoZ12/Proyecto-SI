export async function obtenerFuncionalidad(){
   

    const respuesta= await fetch(import.meta.env.VITE_API_URL_FUNCIONALIDAD)
    const resultado= await respuesta.json()
    return resultado
}


export async function GetFuncionalidad(id){
   

    const respuesta= await fetch(`${import.meta.env.VITE_API_URL_FUNCIONALIDAD}/${id}`)
    const resultado= await respuesta.json()
    return resultado
}

export async function agregarFuncionalidad(datos){
    try {
        const respuesta= await fetch(import.meta.env.VITE_API_URL_FUNCIONALIDAD,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-type':'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function actualizarFuncionalidad(id, datos)
{
    try {
        const respuesta= await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(datos),
            headers:{
                'Content-type':'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarFuncionalidad(id){
    try {
        const respuesta= await fetch(`${import.meta.env.VITE_API_URL_FUNCIONALIDAD}/${id}`,{
            method: 'Delete',
          
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}