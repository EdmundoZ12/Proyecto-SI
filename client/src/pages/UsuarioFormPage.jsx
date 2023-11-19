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
import { useUsers } from "../context/userContext";
import { useRoles } from "../context/rolContext";
import SideBarPage from "./SideBarPage";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";

export default function UsersDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let emptyProduct = {
    nombre: "",
    activo: false,
    password: "",
  };

  const { createUser, updateUser, getUser, getUsers, users, deleteUser } =
    useUsers();

  const { createRol, updateRol, getRol, roles, getRoles, deleteRol } =
    useRoles();

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
    getUsers();
  }, []);

  useEffect(() => {
    getRoles();
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
        <h4 className="m-0">Gestionar Usuario</h4>
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
        console.log(product.id);
        await updateUser(product.id, _product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        console.log(_product);
        await createUser(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      // Después de la actualización, recarga los datos
      const updatedData = await getUsers();
      setProducts(updatedData);

      setProductDialog(false);
      setProduct(emptyProduct);
      setSubmitted(false);
    }
  };

  // ...

  const editProduct = (funcionalidad) => {
    setProduct({ ...funcionalidad });
    setChecked(funcionalidad.activo); // Set the checkbox state based on the functionality
    // Ensure fecha_nacimiento is a JavaScript Date object
    setProduct((prevProduct) => ({
      ...prevProduct,
      fecha_nacimiento: funcionalidad.fecha_nacimiento
        ? new Date(funcionalidad.fecha_nacimiento)
        : null,
    }));
    setProductDialog(true); // Show the edit dialog
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
          label="Nuevo Usuario"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
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

  const statusBodyTemplate = (rowData) => {
    const activo = rowData.activo;

    return (
      <span className={activo ? "text-green-500" : "text-red-500"}>
        {activo ? "Activo" : "Inactivo"}
      </span>
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
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
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
          value={users}
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
          <Column selectionMode="multiple" exportable={false}></Column>

          <Column
            field="nombre"
            header="Nombre"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="apellido"
            header="Apellido"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="ci"
            header="Carnet de Identidad"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="telefono"
            header="Telefono"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="direccion"
            header="Direccion"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="fecha_nacimiento"
            header="Fecha de Nacimiento"
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
            className={classNames({
              "p-invalid": submitted && !product.nombre,
            })}
          />
          {submitted && !product.nombre && (
            <small className="p-error">Nombre es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="apellido" className="font-bold">
            Apellido
          </label>

          <InputText
            id="apellido"
            value={product.apellido}
            onChange={(e) => onInputChange(e, "apellido")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.apellido,
            })}
          />
          {submitted && !product.apellido && (
            <small className="p-error">Apellido is requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="ci" className="font-bold">
            CI
          </label>
          <InputNumber
            inputId="ci"
            value={product.ci}
            onValueChange={(e) => onInputNumberChange(e, "ci")}
            useGrouping={false}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.ci })}
          />
          {submitted && !product.ci && (
            <small className="p-error">
              El Carnet de Identidad es requerido.
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="telefono" className="font-bold">
            Telefono
          </label>

          <InputText
            id="telefono"
            value={product.telefono}
            onChange={(e) => onInputChange(e, "telefono")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.telefono,
            })}
          />
        </div>

        <div className="field">
          <label htmlFor="fecha_nacimiento" className="font-bold">
            Fecha de Nacimiento
          </label>
          <Calendar
            id="fecha_nacimiento"
            value={product.fecha_nacimiento}
            onChange={(e) => onInputChange(e, "fecha_nacimiento")}
            showIcon
            dateFormat="yy/mm/dd"
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.fecha_nacimiento,
            })}
          />
          {submitted && !product.fecha_nacimiento && (
            <small className="p-error">
              La fecha de nacimiento es requerida.
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="fecha_nacimiento" className="font-bold">
            Nombre de Usuario
          </label>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              id="username"
              value={product.username}
              onChange={(e) => onInputChange(e, "username")}
              required
              autoFocus
              placeholder="Username"
              className={classNames({
                "p-invalid": submitted && !product.username,
              })}
            />
            {submitted && !product.username && (
              <small className="p-error">Username is requerido.</small>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="password" className="font-bold">
            Contraseña
          </label>
          <Password
            id="password"
            value={product.password}
            onChange={(e) => onInputChange(e, "password")}
            required
            autoFocus
            placeholder="min 4 caracteres"
            toggleMask
            className={classNames({
              "p-invalid": submitted && !product.password,
            })}
          />
          {submitted && !product.password && (
            <small className="p-error">Password is requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="id_rol" className="font-bold">
            Rol
          </label>
          <Dropdown
            inputId="id_rol"
            name="id_rol"
            value={product.id_rol} // Establece el valor seleccionado
            options={roles.map((role) => ({
              label: role.nombre,
              value: role.id,
            }))} // Mapea los roles a objetos con label y value
            placeholder="Select a Role"
            onChange={(e) => onInputNumberChange(e, "id_rol")} // Actualiza el campo "id_rol"
            className={classNames({
              "p-invalid": submitted && !product.id_rol,
            })}
          />
          {submitted && !product.id_rol && (
            <small className="p-error">Rol is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="direccion" className="font-bold">
            Direccion
          </label>

          <InputText
            id="direccion"
            value={product.direccion}
            onChange={(e) => onInputChange(e, "direccion")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.direccion,
            })}
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
