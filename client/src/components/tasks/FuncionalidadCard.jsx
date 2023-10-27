import { useFuncionalidades } from "../../context/funcionalidadContext";
import { Button, ButtonLink, Card } from "../ui";

export function FuncionalidadCard({ task }) {
  const { deleteFuncionalidad } = useFuncionalidades();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.nombre}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteFuncionalidad(task.id)}>Delete</Button>
          <ButtonLink to={`/funcionalidades/${task.id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.descripcion}</p>
      {/* format date */}
      <h1
        className={`text-2xl font-bold ${
          task.activo ? "text-green-500" : "text-red-500"
        }`}
      >
        {task.activo ? "Activo" : "Inactivo"}
      </h1>
    </Card>
  );
}
