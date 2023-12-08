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
import SideBarPage from "./SideBarPage";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function InventariosDemo() {
  const {
    formState: { errors },
  } = useForm();
  let emptyProduct = {
    cod: null,
    nombre: "",
    descripcion: "",
    precio: 0.0,
    id_categoria: null,
    categoria:""
  };

  const {
    inventario,
    getProductosInventario
  } = useInventario();

  const { categorias, getCategorias, deleteRol } = useCategorias();

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [entradaDialog, setEntradaDialog] = useState(false);

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getProductosInventario()
  }, []);

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
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
    // Configura el estado 'checked' en 'false' al crear un nuevo producto
    setChecked(false);
    setSubmitted(false);
    setProductDialog(true);
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

    if (product.nombre.trim()) {
      let _product = { ...product };

      if (product.cod) {
        console.log(product.cod);
        await updateProducto(product.cod, _product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        await createProducto(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      // Después de la actualización, recarga los datos
      const updatedData = await getProductos();
      setProducts(updatedData);

      setProductDialog(false);
      setProduct(emptyProduct);
      setSubmitted(false);
    }
  };

  // ...
    const saveNota = () => {
    setSubmitted(true);

    if (entrada.cod > 0) {
      // ... (otros códigos existentes)

      const datos = {
        cod: entrada.cod,
        cantidad: entrada.cantidad,
        id: entrada.id,
        precio: entrada.precio,
        productos: productosEntrada, // Agrega los productos al objeto datos
      };

      console.log("Datos de la nota de entrada:", datos);

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
  const editProduct = (producto) => {
    setProduct({ ...producto });
    // Ensure fecha_nacimiento is a JavaScript Date object
    setProductDialog(true); // Show the edit dialog
  };
  const confirmDeleteProduct = (product) => {
    console.log(product);
    setProduct(product);
    setDeleteProductDialog(true);
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
  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product["id_categoria"] = e.value;
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

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nuevo Producto"
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
          value={inventario}
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
            header="Codigo"
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
            field="cantidad"
            header="Cantidad"
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
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Detalle de inventario"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {/* nombre */}

        <div className="field">
          <label htmlFor="nombre" className="font-bold">
            Nombre
          </label>
          <InputText
            disabled
            id="nombre"
            value={product.nombre}
            onChange={(e) => onInputChange(e, "nombre")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.nombre,
            })}
            readOnly
          />
          {submitted && !product.name && (
            <small className="p-error">Nombre es requerido.</small>
          )}
        </div>

        {/* categoria */}

        <div className="field">
          <label htmlFor="categoria" className="font-bold">
            Categoria
          </label>
          <InputText
            disabled
            readOnly
            id="categoria"
            value={product.categoria}
            onChange={(e) => onInputChange(e, "categoria")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.categoria,
            })}
          />
          {submitted && !product.categoria && (
            <small className="p-error">Nombre es requerido.</small>
          )}
        </div>

        {/* cantidad */}
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="cantidad" className="font-bold">
              Cantidad
            </label>
            <InputNumber
              disabled
              readOnly
              id="cantidad"
              value={product.cantidad}
              onValueChange={(e) => onInputNumberChange(e, "cantidad")}
            />
          </div>
        </div>

        {/* precio */}
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="precio" className="font-bold">
              Precio
            </label>
            <InputNumber
              readOnly
              disabled
              id="precio"
              value={product.precio}
              onValueChange={(e) => onInputNumberChange(e, "precio")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.nombre}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
