import { useEffect } from "react";
import { useFuncionalidades} from "../context/funcionalidadContext";
import { FuncionalidadCard} from "../components/tasks/FuncionalidadCard";
import { ImFileEmpty } from "react-icons/im";

export function FuncionalidadPage() {
  const { funcionalidades, getFuncionalidades } = useFuncionalidades();

  useEffect(() => {
    getFuncionalidades();
  }, []);

  return (
    <>
      {funcionalidades.length === 0 && (
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
        {funcionalidades.map((task) => (
          <FuncionalidadCard task={task} key={task.id} />
        ))}
      </div>
    </>
  );
}