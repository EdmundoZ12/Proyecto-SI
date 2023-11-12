import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import SideBarPage from './SideBarPage';

export default function ProductoComponent() {


    // let emptyProduct = {
    //     id: null,
    //     name: '',
    //     image: null,
    //     description: '',
    //     category: null,
    //     price: 0,
    //     quantity: 0,
    //     rating: 0,
    //     inventoryStatus: 'INSTOCK'
    // };


    let emptyProduct = {
        id: null,
        nombre: '',
        descripcion: '',
        id_categoria: null,
        precio: 0,
    };


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [categorias, setCategorias] = useState([]);

    // obtener productos
    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []);

    useEffect(() => {
        // Realiza una solicitud GET a la API externa usando fetch
        // fetch('https://fakestoreapi.com/products')
        fetch('https://wylsomgym.onrender.com/categoria/index')

          .then((response) => {
            // Verifica si la solicitud fue exitosa y obtén los datos
            if (response.ok) {
              return response.json(); // Convierte la respuesta a JSON
            } else {
              throw new Error('Error en la solicitud a la API');
            }
          })
          .then((data) => {
            // Almacena los datos en el estado local
            console.log(data);
            setCategorias(data);
          })
          .catch((error) => {
            console.error('Error al obtener datos de la API:', error);
          });
      }, []);



    useEffect(() => {
        // Realiza una solicitud GET a la API externa usando fetch
        // fetch('https://fakestoreapi.com/products')
        fetch('https://wylsomgym.onrender.com/producto/index')

          .then((response) => {
            // Verifica si la solicitud fue exitosa y obtén los datos
            if (response.ok) {
              return response.json(); // Convierte la respuesta a JSON
            } else {
              throw new Error('Error en la solicitud a la API');
            }
          })
          .then((data) => {
            // Almacena los datos en el estado local
            console.log(data);
            setProducts(data);
          })
          .catch((error) => {
            console.error('Error al obtener datos de la API:', error);
          });
      }, []);
      

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        console.log('Datos de product antes de guardar:', product);
        if (product.nombre.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.cod) {


                const datos = {
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    id_categoria: product.id_categoria,
                    precio: product.precio,
                };
                

                fetch('https://wylsomgym.onrender.com/producto/update/'+product.cod, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                         },
                            body: JSON.stringify(datos),
                                })
                                .then((response) => {
                                if (response.ok) {
                                     return response.json();
                                 } else {
                                    throw new Error('Error en la solicitud a la API');
                                }
                                })


                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {

                const datos = {
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    id_categoria: product.id_categoria,
                    precio: product.precio,
                };
                console.log(datos);
                console.log('yameasd')
                fetch('https://wylsomgym.onrender.com/producto/create', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                         },
                            body: JSON.stringify(datos),
                                })
                                .then((response) => {
                                if (response.ok) {
                                     return response.json();
                                 } else {
                                    throw new Error('Error en la solicitud a la API');
                                }
                                })

                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };




    const editProduct = (product) => {
        console.log(product);
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        console.log(product);
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {

        

        
        console.log(product.cod);

    

        fetch('https://wylsomgym.onrender.com/producto/delete/'+product.cod, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
                 },
                    body: JSON.stringify(),
                        })
                        .then((response) => {
                        if (response.ok) {
                             return response.json();
                         } else {
                            throw new Error('Error en la solicitud a la API');
                        }
                        })




        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['id_categoria'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        console.log("inputnumeber");
        console.log(name);
        
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo producto" icon="pi pi-plus" severity="success" onClick={openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    // boton para cvs
    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Adminisitrar productos</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );







    //eliminar solo 1
    const deleteProductDialogFooter = (
        
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    // eliminar por lote
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    

    return (
        <div>
            <SideBarPage/>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="cod"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>


                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    <Column field="cod" header="Codigo" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="descripcion" header="Descripcion" ></Column>
                    <Column field="precio" header="Precio" sortable style={{ minWidth: '8rem' }}></Column>

                    <Column field="id_categoria"  style={{ display: 'none' }}></Column>

                    <Column field="categoria" header="Categoria" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            {/* crear uno nuevo */}
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle de producto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                
                {/* nombre */}
                
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                    {submitted && !product.name && <small className="p-error">Nombre es requerido.</small>}
                </div>

                {/* descripcion */}
                <div className="field">
                    <label htmlFor="descripcion" className="font-bold">
                        Descripcion
                    </label>
                    <InputTextarea id="descripcion" value={product.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
                </div>


                {/* categoria */}
                <div className="field">
                    <label className="mb-3 font-bold">Categoria</label>
                    <div className="formgrid grid">
                        {categorias.map((categoria) => (
                        <div className="field-radiobutton col-6" key={categoria.id}>
                            <RadioButton inputId={`categoria${categoria.id}`} name="categoria" value={categoria.id} onChange={onCategoryChange} checked={product.id_categoria === categoria.id}/>
                            <label htmlFor={`categoria${categoria.id}`}>{categoria.nombre}</label>
                        </div>
                        ))}
                    </div>
                </div>



                
                {/* precio */}
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="precio" className="font-bold">
                            Precio
                        </label>
                        <InputNumber id="precio" value={product.precio} onValueChange={(e) => onInputNumberChange(e, 'precio')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>
            </Dialog> 



           
            {/* eliminar solo uno */}
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Seguro que quieres eliminar <b>{product.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            
        </div>
    );
}
        