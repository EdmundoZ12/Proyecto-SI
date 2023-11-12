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

export default function categoriaComponent() {


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
        empresa: '',
        telefono: '',
    
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
        
        fetch('https://wylsomgym.onrender.com/proveedor/index')

          .then((response) => {
            if (response.ok) {
              return response.json(); 
            } else {
              throw new Error('Error en la solicitud a la API');
            }
          })
          .then((data) => {
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
        if (product.empresa.trim()) {
            let _products = [...products];

            if (product.id) {

                const datos = {
                    empresa: product.empresa,
                    telefono: product.telefono
                };

                

                fetch('https://wylsomgym.onrender.com/proveedor/update/'+product.id, {
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
                    empresa: product.empresa,
                    telefono: product.telefono
                };

                fetch('https://wylsomgym.onrender.com/proveedor/create', {
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
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        fetch('https://wylsomgym.onrender.com/proveedor/delete/'+product.id, {
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

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo proveedor" icon="pi pi-plus" severity="success" onClick={openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    // boton para cvs
    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };



    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
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
            <h4 className="m-0">Adminisitrar proveedores</h4>
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


    const productDialogFooterEditar = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );






    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
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
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>


                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    <Column field="id"  header="Codigo" sortable style={{ display: 'none' }}></Column>
                    <Column field="empresa" header="Empresa" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="telefono" header="Telefono" ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            {/* crear uno nuevo */}
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle del proveedor" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                
                {/* nombre */}
                
                <div className="field">
                    <label htmlFor="empresa" className="font-bold">
                        Empresa
                    </label>
                    <InputText id="empresa" value={product.empresa} onChange={(e) => onInputChange(e, 'empresa')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.empresa })} />
                    {submitted && !product.empresa && <small className="p-error">Empresa es requerido.</small>}
                </div>


                <div className="field">
                <label htmlFor="ci" className="font-bold"> Telefono</label>
                    <InputNumber inputId="telefono" value={product.telefono} onValueChange={(e) => onInputNumberChange(e, "telefono")} useGrouping={false} required autoFocus className={classNames({ "p-invalid": submitted && !product.telefono })}/>
                    {submitted && !product.telefono && <small className="p-error">El telefono es requerido.</small>}
                </div>

              
            </Dialog> 



           

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                        Seguro que quieres eliminar <b>{product.empresa}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> */}
        </div>
    );
}
        