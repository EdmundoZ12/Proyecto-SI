import { useEffect } from "react";
import { useRoles} from "../context/rolContext";
import { RolCard} from "../components/tasks/RolCard";
import { ImFileEmpty } from "react-icons/im";

export function RolPage() {
  const { roles, getRoles } = useRoles();

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      {roles.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {roles.map((rol) => (
          <RolCard rol={rol} key={rol.id} />
        ))}
      </div>
    </>
  );
}