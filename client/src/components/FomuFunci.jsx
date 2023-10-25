

const FomuFunci = ({funci}) => {
  return (
   <>
         <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="nombre"
                >Nombre:</label>
                <input 
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre de la Funcionalidad"
                    name="nombre"
                    defaultValue={funci?.nombre}
                  
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="usuario"
                >Descripcion:</label>
                <textarea
                    as="textarea"
                    id="descripcion"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50 h-40 align-self"
                    placeholder="Descripcion"
                    name="descripcion"
                    defaultValue={funci?.descripcion}
                />
            </div>

   </>
  )
}

export default FomuFunci