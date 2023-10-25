export async function obtenerUsuario(){
    const url='http://localhost:3000/Usuario'

    const respuesta= await fetch(import.meta.env.VITE_API_URL)
    const resultado= await respuesta.json()
    return resultado
}
export async function GetUsuario(id){
   

    const respuesta= await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const resultado= await respuesta.json()
    return resultado
}

export async function agregarUsuario(datos){
    try {
        const respuesta= await fetch(import.meta.env.VITE_API_URL,{
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

export async function actualizarUsuario(id, datos)
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

export async function eliminarUsuario(id){
    try {
        const respuesta= await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'Delete',
          
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}