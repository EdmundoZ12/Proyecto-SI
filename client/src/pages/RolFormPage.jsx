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
    formState: { errors },
  } = useForm();

  const [activo, setActivo] = useState(false);
  const [selectedFuncionalidades, setSelectedFuncionalidades] = useState([]);
  const { funcionalidades, getFuncionalidades } = useFuncionalidades();

  const handleFuncionalidadChange = (id) => {
    if (selectedFuncionalidades.includes(id)) {
      setSelectedFuncionalidades(
        selectedFuncionalidades.filter((funcId) => funcId !== id)
      );
    } else {
      setSelectedFuncionalidades([...selectedFuncionalidades, id]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        activo: activo,
        permisos: selectedFuncionalidades,
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
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const rolData = await getRol(params.id);
        setValue("nombre", rolData.rol[0].nombre);

        const permisosIDs = rolData.permisos.map(
          (permiso) => permiso.id_funcionalidad
        );
        setSelectedFuncionalidades(permisosIDs);
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
          <p className="text-red-500 text-xs italic">
            Por favor, ingresa un nombre.
          </p>
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
