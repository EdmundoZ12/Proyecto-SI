import React, { useState, useEffect} from 'react'


const CrearRol = () => {
  const [nombre, setNombre] = useState({
    nombre: '',
    permisos: ''
  });

  /*const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };*/

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    useEffect(() => {
      fetch("https://rickandmortyapi.com/api/character/400")
      .then(response =>response.json())
      .then((data)=>setNombre(data))
      },[]);
   
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Cambia el estado del checkbox
  };
  const [isCheckedd, setIsCheckedd] = useState(false);
  const handleCheckboxChangee = () => {
    setIsCheckedd(!isCheckedd); // Cambia el estado del checkbox
    if(isChecked==true){
      //manejar el dato para enviar 1 o 0
    }
  };
      return (
        <div className='contenedor'>
          <h1>Crear Rol</h1>
          <form  className='formulario'>
            <div >
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
               
              />
              <label htmlFor="activo0">ACTIVO</label>
              <input
                 type="checkbox"
                 id="activo0"
                 name="activo0"
                 checked={isChecked}
                 onChange={handleCheckboxChange}
              />
              <label htmlFor="activo1">INACTIVO</label>
              <input
                 type="checkbox"
                 id="activo1"
                 name="activo1"
                 checked={isCheckedd}
                 onChange={handleCheckboxChangee}
              />
            </div>
            <button onClick={handleSubmit} type="submit">Crear</button>
            <button type="submit">Cancelar</button>
          </form>
        </div>
      );
}

export default CrearRol