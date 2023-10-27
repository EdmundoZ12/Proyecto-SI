import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useFuncionalidades } from "../context/funcionalidadContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function FuncionalidadFormPage() {
  const { createFuncionalidad, updateFuncionalidad, getFuncionalidad } =
    useFuncionalidades();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Estado para el checkbox "activo"
  const [activo, setActivo] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Asigna el valor de "activo" del estado al campo "activo" en "data"
      data.activo = activo;
      console.log(params.id);
      console.log(data);
      if (params.id) {
        updateFuncionalidad(params.id, data);
      } else {
        createFuncionalidad({
          ...data,
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getFuncionalidad(params.id);
        console.log(task)
        setValue("nombre", task.nombre);
        setValue("descripcion", task.descripcion);

        // Actualiza el estado "activo" con el valor de la funcionalidad
        setActivo(task.activo);
      }
    };
    loadTask();
  }, []);

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
          <p className="text-red-500 text-xs italic">Please enter a name.</p>
        )}

        <Label htmlFor="descripcion">Descripcion</Label>
        <Textarea
          name="descripcion"
          id="descripcion"
          rows="3"
          placeholder="Descripcion"
          {...register("descripcion")}
        ></Textarea>

        <label htmlFor="activo">Activo:</label>
        <input
          type="checkbox"
          id="activo"
          name="activo"
          value="true"
          checked={activo} // Utiliza el estado "activo" para marcar o desmarcar el checkbox
          onChange={() => setActivo(!activo)} // Cambia el estado cuando se marca/desmarca el checkbox
        />

        <Button>Save</Button>
      </form>
    </Card>
  );
}
