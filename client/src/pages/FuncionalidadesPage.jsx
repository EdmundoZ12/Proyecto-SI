import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "./service/Func";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Checkbox } from "primereact/checkbox";
import { useFuncionalidades } from "../context/funcionalidadContext";
import SideBarPage from "./SideBarPage";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function FuncionalidadesDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let emptyProduct = {
    id: 0,
    nombre: "",
    descripcion: "",
    activo: false,
  };

  const {
    createFuncionalidad,
    updateFuncionalidad,
    getFuncionalidad,
    getFuncionalidades,
    funcionalidades,
    deleteFuncionalidad,
  } = useFuncionalidades();

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const params = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getFuncionalidades();
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
        <h4 className="m-0">Gestionar Funcionalidad</h4>
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

  const [loading, setLoading] = useState(true); // Agrega un estado "loading"

  const loadProducts = () => {
    ProductService.getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (loading) {
      loadProducts();
    }
  }, [loading]);

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.nombre.trim()) {
      let _product = { ...product };
      _product.activo = checked;

      if (product.id) {
        await updateFuncionalidad(product.id, _product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        await createFuncionalidad(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      // Después de la actualización, recarga los datos
      const updatedData = await getFuncionalidades();
      setProducts(updatedData);

      setProductDialog(false);
      setProduct(emptyProduct);
      setSubmitted(false);
    }
  };

  // ...

  const editProduct = (funcionalidad) => {
    console.log("editProduct llamado");
    console.log("Valor de activo de la funcionalidad:", funcionalidad.activo);
    setProduct({ ...funcionalidad });
    setChecked(funcionalidad.activo); // Establece el estado del checkbox según la funcionalidad
    setProductDialog(true); // Muestra el diálogo de edición
  };
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    deleteFuncionalidad(product.id);
    const updatedData = await getFuncionalidades();
    setProducts(updatedData);

    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
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

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nueva Funcionalidad"
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
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        {/* <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        /> */}
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    const activo = rowData.activo;

    return (
      <span className={activo ? "text-green-500" : "text-red-500"}>
        {activo ? "Activo" : "Inactivo"}
      </span>
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
          value={funcionalidades}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          filters={filters}
          header={renderHeader}
        >

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
            body={statusBodyTemplate}
            header="Estado"
            style={{ minWidth: "8rem" }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="nombre" className="font-bold">
            Name
          </label>

          <InputText
            id="nombre"
            value={product.nombre}
            onChange={(e) => onInputChange(e, "nombre")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.nombre && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion" className="font-bold">
            Description
          </label>
          <InputTextarea
            id="descripcion"
            value={product.descripcion}
            onChange={(e) => onInputChange(e, "descripcion")}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="activo">Activo:</label>
          <input
            type="checkbox"
            id="activo"
            name="activo"
            checked={checked} // Configura el estado del checkbox
            onChange={(e) => setChecked(e.target.checked)} // Cambia el estado cuando se marca/desmarca el checkbox
          />
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
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
