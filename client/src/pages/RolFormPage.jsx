import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useRoles } from "../context/rolContext";
import { useFuncionalidades } from "../context/funcionalidadContext";
import { useForm } from "react-hook-form";

export function RolFormPage() {
  const { createRol, updateRol, getRol } = useRoles();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const [activo, setActivo] = useState(false);
  const [selectedFuncionalidades, setSelectedFuncionalidades] = useState([]);
  const [data, setData] = useState({
    nombre: "", // Inicializa el nombre como una cadena vacía
    permisos: [] // Inicializa permisos como un array vacío
  });

  const { funcionalidades, getFuncionalidades } = useFuncionalidades();

  const handleFuncionalidadChange = (id) => {
    if (selectedFuncionalidades.includes(id)) {
      setSelectedFuncionalidades(selectedFuncionalidades.filter((funcId) => funcId !== id));
    } else {
      setSelectedFuncionalidades([...selectedFuncionalidades, id]);
    }

    // Actualiza el objeto de datos (data) con las funcionalidades seleccionadas
    setData({
      ...data,
      permisos: selectedFuncionalidades
    });
  };

  
  const onSubmit = async (data) => {
    try {
      // Combina el objeto data con el estado "activo"
      const formData = {
        ...data,
        activo: activo,
        permisos: selectedFuncionalidades // Incluye los IDs de las funcionalidades seleccionadas
      };

      console.log(params.id);
      console.log(formData);

      if (params.id) {
        await updateRol(params.id, formData);
      } else {
        await createRol(formData);
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de manera adecuada
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const rolData = await getRol(params.id);
        setValue("nombre", rolData.rol[0].nombre); // Asume que el nombre está en la primera posición del arreglo "rol"
        
        // Ahora, obtén los permisos asociados a este rol
        const permisosData = await getPermisosPorRol(params.id); // Reemplaza "getPermisosPorRol" con la función real que obtiene los permisos por rol
        
        // Extrae los IDs de los permisos y actualiza el estado "selectedFuncionalidades"
        const permisosIDs = permisosData.permisos.map((permiso) => permiso.id);
        setSelectedFuncionalidades(permisosIDs);
  
        // Actualiza el objeto de datos (data) con los permisos seleccionados
        setData({
          ...data,
          permisos: permisosIDs
        });
      }
    };
    loadTask();
  }, [params.id, getRol, setValue]);
  

  useEffect(() => {
    getFuncionalidades();
  }, [getFuncionalidades]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          {...register("nombre")}
          autoFocus
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs italic">Por favor, ingresa un nombre.</p>
        )}

        {funcionalidades.map((funcionalidad) => (
          <div key={funcionalidad.id}>
            <input
              type="checkbox"
              id={`funcionalidad-${funcionalidad.id}`}
              name={`funcionalidad-${funcionalidad.id}`}
              value={funcionalidad.id}
              checked={selectedFuncionalidades.includes(funcionalidad.id)}
              onChange={() => handleFuncionalidadChange(funcionalidad.id)}
            />
            <label htmlFor={`funcionalidad-${funcionalidad.id}`}>
              {funcionalidad.nombre}
            </label>
            
          </div>
        ))}

        <Button>Guardar</Button>
      </form>
    </Card>
  );
}
