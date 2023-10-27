import { useRoles } from "../../context/rolContext";
import { Button, ButtonLink, Card } from "../ui";


export function RolCard({ rol }) {
    const { deleteRol} = useRoles();
    console.log(rol)
    return (
        
      <Card>
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{rol.nombre}</h1>
          <div className="flex gap-x-2 items-center">
            <Button onClick={() => deleteRol(rol.id)}>Delete</Button>
            <ButtonLink to={`/roles/${rol.id}`}>Edit</ButtonLink>
          </div>
        </header>
        
        <h1
          className={`text-2xl font-bold ${
            rol.activo ? "text-green-500" : "text-red-500"
          }`}
        >
          {rol.activo ? "Activo" : "Inactivo"}
        </h1>
      </Card>
    );
  }