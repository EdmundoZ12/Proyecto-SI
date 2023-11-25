import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useCategorias } from "../context/categoriaContext";
import { useProductos } from "../context/productoContext";
import { useInventario } from "../context/inventarioContext";
import { useNota_Entrada } from "../context/nota-de-entradaContext";
import SideBarPage from "./SideBarPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useProveedores } from "../context/proveedorContext";
import { useAuth } from "../context/authContext";
import { useEntrenadores } from "../context/entrenadorContext";
import { useDisciplinas } from "../context/disciplinaContext";
import { useHorarios } from "../context/horarioContext";
import { Checkbox } from "primereact/checkbox";

export default function EntrenadoresDemo() {
  const {
    formState: { errors },
  } = useForm();
  let emptyProduct = {
    cod: null,
    nombre: "",
    empresa: null,
    monto: null,
    descripcion: "",
    id_usuario: null,
    cod_disciplina: null,
    horarios: null,
  };
  const {
    disciplinas,
    getDisciplinas,
    getDisciplina,
    createDisciplina,
    updateDisciplina,
  } = useDisciplinas();
  const { entrenadores, getEntrenadores, createEntrenador, updateEntrenador,getSoloEntrenadores,soloentrenadores } =
    useEntrenadores();
  const { createHorario, updateHorario, getHorario, getHorarios, horarios } =
    useHorarios();

  const { nota_Entrada, createNota_Entrada, getNotas_Entrada } =
    useNota_Entrada();
  const {
    createProducto,
    updateProducto,
    getProducto,
    getProductos,
    productos,
    deleteProducto,
  } = useProductos();
  const { categorias, getCategorias, deleteRol } = useCategorias();
  const {
    createProveedor,
    updateProveedor,
    getProveedor,
    getProveedores,
    proveedores,
    deleteProveedor,
  } = useProveedores();
  let emptyEntrada = {
    cod: null,
    empresa: "",
    cantidad: 0,
    precio: 0.0,
    cod_producto: null,
    nombre: "",
    id_usuario: null,
    cod_disciplina: null,
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedFuncionalidades, setSelectedFuncionalidades] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [productosEntrada, setProductosEntrada] = useState([]);
  const [productosAsociados, setProductosAsociados] = useState([]);
  const [entradaDialog, setEntradaDialog] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const [entrada, setEntrada] = useState(emptyEntrada);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getNotas_Entrada();
    getDisciplinas();
    getEntrenadores();
    getHorarios();
    getSoloEntrenadores();
    user.id;
  }, []);

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };
  const agregarProducto = () => {
    const nuevoProducto = {
      cod: entrada.cod_producto,
      nombre: entrada.nombre, // Cambiar a la propiedad correcta para el código del producto
      cantidad: entrada.cantidad,
      precio: parseFloat(entrada.precio),
    };
    console.log(nuevoProducto);

    setProductosEntrada([...productosEntrada, nuevoProducto]);
    setEntrada(emptyEntrada);
  };
  const onNotaEntradaChange = (e) => {
    const notaSeleccionada = e.value;

    // Obtener los productos asociados a la nota de entrada seleccionada
    const productosAsociados = notaSeleccionada
      ? notaSeleccionada.productos
      : [];
    setProductosAsociados(productosAsociados);

    // Resto del código...
  };

  const handleFuncionalidadChange = (id) => {
    if (selectedFuncionalidades.includes(id)) {
      setSelectedFuncionalidades(
        selectedFuncionalidades.filter((funcId) => funcId !== id)
      );
    } else {
      setSelectedFuncionalidades([...selectedFuncionalidades, id]);
    }
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 className="m-0">Gestionar Producto</h4>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Global Search"
          />
        </span>
      </div>
    );
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setEntrada(emptyEntrada);
    setProductosEntrada([]);
    setChecked(false);
    setSelectedFuncionalidades([]);
    setSubmitted(false);
    setEntradaDialog(true);
  };

  const hideDialog = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    const datos = {
      id_usuario: product.id_usuario,
      cod_disciplina: product.cod_disciplina,
      horarios: selectedFuncionalidades,
    };

    await createEntrenador(datos);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Created",
      life: 3000,
    });

    console.log(datos);
    /* await createNota_Entrada(datos);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Created",
      life: 3000,
    });*/

    // Después de la actualización, recarga los datos
    const updatedData = await getEntrenadores();
    setProducts(updatedData);

    setProductDialog(false);
    setProduct(emptyProduct);
    setSubmitted(false);
    setSearchQuery(null);
    setEntradaDialog(false);
    setEntrada(emptyEntrada);
    setProductosEntrada([]);
  };
  const saveNota = () => {
    //setSubmitted(true);
    console.log(user);
    const datos = {
      id_usuario: user.id,
      id_proveedor: product.id_proveedor,
      productos: productosEntrada.map((producto) => ({
        cod_producto: producto.cod,
        cantidad: producto.cantidad,
        precio: producto.precio,
      })),
    };

    console.log("Datos de la nota de entrada:", datos);

    if (entrada.cod > 0) {
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Nota creada",
        life: 3000,
      });
      setSearchQuery(null);
      setEntradaDialog(false);
      setEntrada(emptyEntrada);
      setProductosEntrada([]); // Limpia los productos después de guardar la nota
    }
  };
  // ...

  const editProduct = (producto) => {
    setProduct({ ...producto });

    const productosAsociados = producto.productos || [];
    setProductosAsociados(productosAsociados);

    setProductDialog(true); // Show the edit dialog
  };
  const confirmDeleteProduct = (product) => {
    console.log(product);
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const hideEntradaDialog = () => {
    setSubmitted(false);
    setEntradaDialog(false);
    setSearchQuery(null);
  };
  const deleteProduct = async () => {
    await deleteProducto(product.cod);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });

    // Después de eliminar, actualiza los productos
    const updatedData = await getProductos();
    setProducts(updatedData);

    setDeleteProductDialog(false);
    setProduct(emptyProduct);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };
  const onCategoryChange = async (e) => {
    let _product = { ...product };

    _product["cod_disciplina"] = e.value;

    setProduct(_product);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = name === "activo" ? e.target.checked : e.target.value;
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  const onInputNumberChange = async (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    console.log(val)
    _product[`${name}`] = val;

    setProduct(_product);
  };
  const onInputNumberChange2 = async (e, name) => {
    const val = e.value || 0;
    let _product = { ...entrada };
    console.log(e.value);

    _product[`${name}`] = val;

    setEntrada(_product);
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nueva Nota de Entrada"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        {/* <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} /> */}
      </React.Fragment>
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );

  const EntradaDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideEntradaDialog}
      />
      <Button label="Guardar nota" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <SideBarPage />
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={entrenadores}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="cod"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          filters={filters}
          header={renderHeader}
        >
          <Column
            field="nombre_entrenador"
            header="Entrenador"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="nombre_disciplina"
            header="Disciplina"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={productDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle de Nota de Entrada"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {/* Tabla de Productos Asociados */}
        <div className="card">
          <DataTable
            value={productosAsociados}
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
          >
            {/* Define las columnas según la estructura de los productos */}
            <Column
              field="cod_producto"
              header="COD"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              header="Nombre Producto"
              body={(rowData) => rowData.nombre}
            ></Column>
            <Column
              header="Cantidad"
              body={(rowData) => rowData.cantidad}
            ></Column>
            <Column header="Precio" body={(rowData) => rowData.precio}></Column>
            <Column
              header="Monto"
              body={(rowData) => rowData.monto_producto}
            ></Column>
          </DataTable>
        </div>
      </Dialog>

      {/*Crear Nuevo Entrenador-Disciplina */}
      <Dialog
        visible={entradaDialog}
        style={{ width: "70rem", margin: "0 auto" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle Entrenador-Disciplina"
        modal
        className="p-fluid"
        footer={EntradaDialogFooter}
        onHide={hideEntradaDialog}
      >
        {/* nombre Producto*/}
        <div className="field">
          <label htmlFor="cod_producto" className="font-bold">
            Entrenadores
          </label>
          <Dropdown
            inputId="id_usuario"
            name="id_usuario"
            value={product.id_usuario} // Establece el valor seleccionado
            
            options={soloentrenadores.map((entrenador) => ({
              label: entrenador.nombre,
              value: entrenador.id,
            }))} // Mapea los roles a objetos con label y value
            placeholder="Selecciona un Entrenador"
            onChange={(e) => onInputNumberChange(e, "id_usuario")} // Actualiza el campo "id_rol"
          />
        </div>

        {/* Proveedores */}
        <div className="field">
          <label className="mb-3 font-bold">Disciplinas</label>
          <div className="formgrid grid">
            {disciplinas.map((disciplina) => (
              <div className="field-radiobutton col-6" key={disciplina.cod}>
                <RadioButton
                  inputId={`disciplina${disciplina.cod}`}
                  name="cod_disciplina"
                  value={disciplina.cod}
                  onChange={onCategoryChange}
                  checked={product.cod_disciplina === disciplina.cod}
                />
                <label htmlFor={`proveedor${disciplina.cod}`}>
                  {disciplina.nombre}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="mb-3 font-bold">Escoge uno o mas horarios</label>
          <div className="flex flex-column gap-3">
            {horarios.map((horario) => {
              return (
                <div key={horario.id} className="flex align-items-center">
                  <Checkbox
                    inputId={horario.id}
                    name={`horario-${horario.id}`}
                    value={horario.id}
                    checked={
                      selectedFuncionalidades &&
                      selectedFuncionalidades.includes(horario.id)
                    }
                    onChange={() => handleFuncionalidadChange(horario.id)}
                  />
                  <label htmlFor={`horario-${horario.id}`}>
                    {`${horario.dia} de ${horario.hora_inicio} hasta ${horario.hora_fin}`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
