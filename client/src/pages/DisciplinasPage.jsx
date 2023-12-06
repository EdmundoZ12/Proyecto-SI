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
import { useDisciplinas } from "../context/disciplinaContext";
import SideBarPage from "./SideBarPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useProveedores } from "../context/proveedorContext";
import { useAuth } from "../context/authContext";

export default function DisciplinasDemo() {
  const {
    formState: { errors },
  } = useForm();
  let emptyProduct = {
    cod: null,
    nombre: "",
    empresa: null,
    monto: null,
    descripcion: "",
    precio: 0.0,
    id_proveedor: null,
    cod_producto: null,
    categoria: "",
    monto_producto: null,
    activo:false
  };

  const {
    disciplinas,
    getDisciplinas,
    getDisciplina,
    createDisciplina,
    updateDisciplina,
  } = useDisciplinas();

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
    nombre: "",
    descripcion:"",
    precio: 0.0,
    activo: false,
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
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
    getDisciplinas();
    console.log(disciplinas);
    user.username;
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
  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 className="m-0">Gestionar Disciplina</h4>
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
    setChecked(false)
    setProductosEntrada([]);
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

    if (entrada.nombre.trim()) {
      let _product = { ...entrada };
      _product.activo = checked;
        console.log(_product);
        await createDisciplina(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      //}

      // Después de la actualización, recarga los datos
      const updatedData = await getDisciplinas();
      setProducts(updatedData);
      setProductDialog(false);
      setProduct(emptyProduct);
      setSubmitted(false);
      setEntradaDialog(false);
      setEntrada(emptyEntrada);
      setProductosEntrada([]);
    }
  };


  const updateProduct = async () => {
    setSubmitted(true);
    if (product.nombre.trim()) {
      let _product = { ...product };
      _product.activo = checked;

      if (product.cod) {
        console.log(product.cod);
        await updateDisciplina(product.cod, _product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      }

      // Después de la actualización, recarga los datos
      const updatedData = await getDisciplinas();
      setProducts(updatedData);
      setProductDialog(false);
      setProduct(emptyProduct);
      setSubmitted(false);
      setEntradaDialog(false);
      setEntrada(emptyEntrada);
      setProductosEntrada([]);
    }
  };

  const editProduct = (producto) => {
    setProduct({ ...producto });
    setChecked(producto.activo);
    const productosAsociados = producto.horarios || [];
    setProductosAsociados(productosAsociados);

    setProductDialog(true); // Show the edit dialog
  };
  const statusBodyTemplate = (rowData) => {
    const activo = rowData.activo;

    return (
      <span className={activo ? "text-green-500" : "text-red-500"}>
        {activo ? "Activo" : "Inactivo"}
      </span>
    );
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

    _product["id_proveedor"] = e.value;

    setProduct(_product);
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
    let _product = { ...entrada };
    _product[`${name}`] = val;

    setEntrada(_product);
  };
  const onInputChangeEntrada = (e, name) => {
    const val = name === "activo" ? e.target.checked : e.target.value;
    let _product = { ...entrada };
    _product[`${name}`] = val;
    setEntrada(_product);
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nueva Disciplina"
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

  const productActuaFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save2" icon="pi pi-check" onClick={updateProduct} />
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
          value={disciplinas}
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
            field="cod"
            header="Codigo de Disciplina"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="nombre"
            header="Nombre"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="descripcion"
            header="Descripcion"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="precio"
            header="Precio"
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
        style={{ width: "60rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle de Horarios"
        modal
        className="p-fluid"
        footer={productActuaFooter}
        onHide={hideDialog}
      >
        {/* nombre Disciplina*/}
        <div
          className="formgrid grid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="field">
            <label htmlFor="cod" className="font-bold">
              Codigo de la Disciplina
            </label>

            <InputText
              id="cod"
              value={product.cod}
              onChange={(e) => onInputChange(e, "cod")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.cod,
              })}
            />
            {submitted && !product.cod && (
              <small className="p-error">
                El codigo de disciplina es Requerido.
              </small>
            )}
          </div>

          <div className="field">
            <label htmlFor="nombre" className="font-bold">
              Nombre
            </label>
            <InputText
              id="nombre"
              value={product.nombre}
              onChange={(e) => onInputChange(e, "nombre")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.nombre,
              })}
            />
            {submitted && !product.nombre && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="descripcion" className="font-bold">
            Descripcion
          </label>
          <InputTextarea
            id="descripcion"
            value={product.descripcion}
            onChange={(e) => onInputChange(e, "descripcion")}
            required
            rows={3}
            cols={20}
            className={classNames({
              "p-invalid": submitted && !product.descripcion,
            })}
          />
          {submitted && !product.descripcion && (
            <small className="p-error">La Descripcion es requerida.</small>
          )}
        </div>

        <div
          className="formgrid grid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Entrada de Precio */}
          <div className="field col" style={{ marginRight: "10px" }}>
            <label htmlFor="precio" className="font-bold">
              Precio
            </label>
            <InputNumber
              id="precio"
              value={product.precio}
              onValueChange={(e) => onInputNumberChange(e, "precio")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>

          <div className="field col" style={{ marginRight: "10px" }}>
            <label htmlFor="activo" className="font-bold">
              Activo:
            </label>
            <div className="field col" style={{ marginTop: "10px" }}>
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={checked} // Configura el estado del checkbox
                className="field col"
                onChange={(e) => setChecked(e.target.checked)} // Cambia el estado cuando se marca/desmarca el checkbox
              />
            </div>
          </div>
        </div>
        {/* Tabla de Productos Asociados */}
        <div className="card">
          <DataTable
            value={productosAsociados}
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
          >
            {/* Define las columnas según la estructura de los productos */}
            <Column
              field="id_horario"
              header="COD"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column header="Dia" body={(rowData) => rowData.dia}></Column>
            <Column
              header="Hora de Inicio"
              body={(rowData) => rowData.hora_inicio}
            ></Column>
            <Column
              header="Hora de Finalizacion"
              body={(rowData) => rowData.hora_fin}
            ></Column>
          </DataTable>
        </div>
      </Dialog>

      {/*Crear Nueva Disciplina */}
      <Dialog
        visible={entradaDialog}
        style={{ width: "50rem", margin: "0 auto" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle nota entrada"
        modal
        className="p-fluid"
        footer={EntradaDialogFooter}
        onHide={hideEntradaDialog}
      >
        {/* nombre Disciplina*/}
        <div
          className="formgrid grid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="field">
            <label htmlFor="cod" className="font-bold">
              Codigo de la Disciplina
            </label>

            <InputText
              id="cod"
              value={entrada.cod}
              onChange={(e) => onInputChangeEntrada(e, "cod")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !entrada.cod,
              })}
            />
            {submitted && !entrada.cod && (
              <small className="p-error">
                El codigo de disciplina es Requerido.
              </small>
            )}
          </div>

          <div className="field">
            <label htmlFor="nombre" className="font-bold">
              Nombre
            </label>
            <InputText
              id="nombre"
              value={entrada.nombre}
              onChange={(e) => onInputChangeEntrada(e, "nombre")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !entrada.nombre,
              })}
            />
            {submitted && !entrada.nombre && (
              <small className="p-error">Nombre es requerido.</small>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="descripcion" className="font-bold">
            Descripcion
          </label>
          <InputTextarea
            id="descripcion"
            value={entrada.descripcion}
            onChange={(e) => onInputChangeEntrada(e, "descripcion")}
            required
            rows={3}
            cols={20}
            className={classNames({
              "p-invalid": submitted && !entrada.descripcion,
            })}
          />
          {submitted && !entrada.descripcion && (
            <small className="p-error">La Descripcion es requerida.</small>
          )}
        </div>

        <div
          className="formgrid grid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Entrada de Precio */}
          <div className="field col" style={{ marginRight: "10px" }}>
            <label htmlFor="precio" className="font-bold">
              Precio
            </label>
            <InputNumber
              id="precio"
              value={entrada.precio}
              onValueChange={(e) => onInputNumberChange(e, "precio")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>

          <div className="field col" style={{ marginRight: "10px" }}>
            <label htmlFor="activo" className="font-bold">
              Activo:
            </label>
            <div className="field col" style={{ marginTop: "10px" }}>
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={checked} // Configura el estado del checkbox
                className="field col"
                onChange={(e) => setChecked(e.target.checked)} // Cambia el estado cuando se marca/desmarca el checkbox
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
