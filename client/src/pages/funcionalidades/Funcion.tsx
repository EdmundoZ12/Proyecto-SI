import { useState } from "react";
import "./funcionalidad.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    type: "string",
    headerName: "Nombre",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Descripcion",
    width: 150,
  },
 
];

const Funcion = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Agregar Funcionalidad</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} url="/funcion" />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="Funcionalidad" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Funcion;