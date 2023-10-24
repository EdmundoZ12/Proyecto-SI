import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "firstName",
    type: "string",
    headerName: "Nombre",
    width: 100,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Apellido",
    width: 100,
  },
  {
    field: "ci",
    type: "string",
    headerName: "CI",
    width: 200,
  },
  {
    field: "telefono",
    type: "string",
    headerName: "Telefono",
    width: 150,
  },
  {
    field: "fecha_de_nacimiento",
    type: "string",
    headerName: "FechaNacimiento",
    width: 150,
  },
  {
    field: "direccion",
    type: "string",
    headerName: "Direccion",
    width: 100,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });


  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Agregar Usuario</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} url="/users"/>
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="Usuario" columns={columns} setOpen={setOpen}  />}
    </div>
  );
};

export default Users;
