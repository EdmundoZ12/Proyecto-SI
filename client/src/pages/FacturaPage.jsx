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
import { useFactura } from "../context/facturaContext";
import SideBarPage from "./SideBarPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useProveedores } from "../context/proveedorContext";
import { useClientes } from "../context/clientesContext";
import { useAuth } from "../context/authContext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {jsPDF} from "jspdf"
import "jspdf-autotable"
import logo from '../images/Logo.jpeg'

export default function FacturasDemo() {
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
    id_cliente: null,
    cod_producto: null,
    categoria: "",
    monto_producto: null,
    nombreusuario: "",
    nombrecliente: "",
  };

  const { inventario, getProductosInventario } = useInventario();

  const { nota_Entrada, createNota_Entrada, getNotas_Entrada } =
    useNota_Entrada();
  const { facturas, createFactura, getFacturas } = useFactura();
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

  const {
    createCliente,
    updateCliente,
    getCliente,
    getClientes,
    clientes,
    deleteCliente,
  } = useClientes();
  let emptyEntrada = {
    cod: null,
    nombreusuario: "",
    nombrecliente: "",
    cantidad: 0,
    precio: 0.0,
    cod_producto: null,
    nombre: "",
  };

  let monto_total = 0.0;

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [montoTotal, setMontoTotal] = useState(0.0);
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
    getFacturas();
    getProveedores();
    getClientes();
    getProductos();
    console.log(clientes);
    //user.id;
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
      monto_producto: parseFloat(entrada.precio) * entrada.cantidad,
    };

    // monto_total=monto_total+nuevoProducto.monto_producto;
    // console.log(monto_total)

    console.log(nuevoProducto);

    setProductosEntrada([...productosEntrada, nuevoProducto]);
    setMontoTotal(
      (prevMontoTotal) => prevMontoTotal + nuevoProducto.monto_producto
    );
    setEntrada(emptyEntrada);
  };

  const imprimir = () => {
    const doc = new jsPDF();
    const columns = ["Productos", "Cantidad", "Precio", "Total"];
    const data = [];

    var monto = 0;
    for (let i = 0; i < productosAsociados.length - 2; i++) {
      var dato = [
        `${productosAsociados[i].nombre}`,
        `${productosAsociados[i].cantidad}`,
        `${productosAsociados[i].precio}`,
        `${productosAsociados[i].cantidad * productosAsociados[i].precio}`,
      ];
      data.push(dato);
      monto =
        monto + productosAsociados[i].cantidad * productosAsociados[i].precio;
    }
    data.push(["Monto Total", "", "", `${monto}`]);
    const fecha = productosAsociados[0].fecha;
    const cliente = productosAsociados[productosAsociados.length - 1];
    const usuario = productosAsociados[productosAsociados.length - 2];
    console.log(fecha);
    doc.text("Factura", 95, 20);
    doc.text(`Cliente: ${cliente}`, 10, 90);
    doc.text(`Usuario: ${usuario}`, 10, 110);
    doc.text(`FECHA EMITIDA: ${fecha}`, 10, 130);

    doc.autoTable({
      startY: 30,
      head: [columns],
      body: data,
    });
    doc.addImage(logo, "JPEG", 10, 10, 20, 20);
    doc.save(`factura.pdf`);
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
        <h4 className="m-0">Gestionar Factura</h4>
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
    setMontoTotal(0, 0);
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
      id_usuario: user.id,
      id_cliente: product.id_cliente,
      productos: productosEntrada.map((producto) => ({
        cod_producto: producto.cod,
        cantidad: producto.cantidad,
        precio: producto.precio,
      })),
    };

    console.log(datos);
    await createFactura(datos);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Factura Creada",
      life: 3000,
    });

    // Después de la actualización, recarga los datos
    const updatedData = await getFacturas();
    setProducts(updatedData);

    setProductDialog(false);
    setProduct(emptyProduct);
    setSubmitted(false);
    setSearchQuery(null);
    setEntradaDialog(false);
    setMontoTotal(0, 0);
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

    //console.log("Datos de la nota de entrada:", datos);

    if (entrada.cod > 0) {
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Factura Creada",
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

    const productosAsociadoss = producto.productos || [];
    const cliente = producto.nombrecliente;
    const usuario = producto.nombreusuario;
    setProductosAsociados([...productosAsociadoss, cliente, usuario]);

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

    _product["id_cliente"] = e.value;

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

  const OnMonto = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = _product[`${name}`] + val;
    setProduct(_product);
  };

  const onInputNumberChange = async (e, name) => {
    const val = e.value || 0;
    let _product = { ...entrada };
    _product[`${name}`] = val;

    setEntrada(_product);
  };
  const onInputNumberChange2 = async (e, name) => {
    const val = e.value || 0;
    let _product = { ...entrada };
    console.log(e.value);
    const nombrepro = await getProducto(e.value);

    console.log(nombrepro.nombre);
    console.log(nombrepro.precio);
    _product[`${name}`] = val;
    _product["nombre"] = nombrepro.nombre;
    _product["precio"] = nombrepro.precio;

    setEntrada(_product);
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nueva Factura"
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
      <Button label="imprimir" icon="pi pi-upload" onClick={imprimir} />
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
      <Button
        label="Guardar Factura"
        icon="pi pi-check"
        onClick={saveProduct}
      />
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
          value={facturas}
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
            field="nombreusuario"
            header="Nombre Usuario"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="nombrecliente"
            header="Cliente"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="monto"
            header="Monto Total"
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
        style={{ width: "70rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle Factura"
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

      {/*Crear Nueva nota de entrada */}
      <Dialog
        visible={entradaDialog}
        style={{ width: "70rem", margin: "0 auto" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle Factura"
        modal
        className="p-fluid"
        footer={EntradaDialogFooter}
        onHide={hideEntradaDialog}
      >
        {/* nombre Producto*/}
        <div className="field">
          <label htmlFor="cod_producto" className="font-bold">
            Producto
          </label>
          <Dropdown
            inputId="cod_producto"
            name="cod_producto"
            value={entrada.cod_producto} // Establece el valor seleccionado
            options={productos.map((producto) => ({
              label: producto.nombre,
              value: producto.cod,
            }))} // Mapea los roles a objetos con label y value
            placeholder="Selecciona un Producto"
            onChange={(e) => onInputNumberChange2(e, "cod_producto")} // Actualiza el campo "id_rol"
          />
        </div>

        {/* nombre Producto*/}
        <div className="field">
          <label htmlFor="cod_producto" className="font-bold">
            Seleccione el Cliente
          </label>
          <Dropdown
            inputId="id_cliente"
            name="id_cliente"
            value={product.id_cliente} // Establece el valor seleccionado
            options={clientes.map((cliente) => ({
              label: cliente.nombre,
              value: cliente.id,
            }))} // Mapea los roles a objetos con label y value
            placeholder="Selecciona un Cliente"
            onChange={(e) => onCategoryChange(e)} // Actualiza el campo "id_rol"
          />
        </div>

        {/* Proveedores */}
        {/* <div className="field">
          <label className="mb-3 font-bold">Proveedores</label>
          <div className="formgrid grid">
            {proveedores.map((proveedor) => (
              <div className="field-radiobutton col-6" key={proveedor.id}>
                <RadioButton
                  inputId={`proveedor${proveedor.id}`}
                  name="id_proveedor"
                  value={proveedor.id}
                  onChange={onCategoryChange}
                  checked={product.id_proveedor === proveedor.id}
                />
                <label htmlFor={`proveedor${proveedor.id}`}>
                  {proveedor.empresa}
                </label>
              </div>
            ))}
          </div>
        </div> */}

        <div
          className="formgrid grid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Entrada de Cantidad */}
          <div className="field col" style={{ marginRight: "10px" }}>
            <label htmlFor="cantidad" className="font-bold">
              Cantidad
            </label>
            <InputNumber
              inputId="cantidad"
              value={entrada.cantidad}
              onValueChange={(e) => onInputNumberChange(e, "cantidad")}
              mode="decimal"
              showButtons
              min={0}
              // max={100}
            />
          </div>

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

          {/* Botón */}
          <div className="field col" style={{ marginTop: "24px" }}>
            <Button
              icon="pi pi-plus"
              aria-label="Filter"
              onClick={agregarProducto}
            />
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="card">
          <DataTable
            value={productosEntrada}
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="cod" header="Cod"></Column>
            <Column field="nombre" header="Nombre del Producto"></Column>
            <Column field="cantidad" header="Cantidad"></Column>
            <Column field="precio" header="Precio"></Column>
            <Column field="monto_producto" header="Monto"></Column>
          </DataTable>
        </div>

        {/*Monto Total */}
        {/* Entrada de Precio */}
        <div className="field col" style={{ marginRight: "10px" }}>
          <label htmlFor="precio" className="font-bold">
            Monto Total
          </label>
          <InputNumber
            id="monto_total"
            value={montoTotal}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
      </Dialog>
    </div>
  );
}
