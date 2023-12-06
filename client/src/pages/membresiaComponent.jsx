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
import { Calendar } from "primereact/calendar";

import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips';
import { addDays, format, parse } from 'date-fns';
import { da } from 'date-fns/locale';
import { Card } from 'primereact/card';

        


import { useDisciplinas } from "../context/disciplinaContext";
import { useMemebresia } from "../context/membresiaContext";
import { useEntrenadores } from "../context/entrenadorContext";
import { useAuth } from "../context/authContext";




export default function MembresiaDemo() {

    const {
        disciplinas,
        getDisciplinas,
        getDisciplina,
        createDisciplina,
        updateDisciplina,
      } = useDisciplinas();

    const { membresias, getMembresias, createMembresia } = useMemebresia();
    const { entrenadores, getEntrenadores, createEntrenador, updateEntrenador,getSoloEntrenadores,soloentrenadores } = useEntrenadores();
    const { isAuthenticated, logout, user } = useAuth();


    useEffect(() => {
        getMembresias();
        getEntrenadores();
        getDisciplinas();
    }, []);

    let emptyProduct = {
        cliente: '',
        disciplina: [],
        fechaI:'',
        fechaF:'',
        pago: '',
        monto: ''   
    };


    const [products, setProducts] = useState(null);

    const [clientes, setClientes] = useState(null);
    const [cliente, setCliente] = useState(null);


    const [clienteDialog, setclienteDialog] = useState(false);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [categorias, setCategorias] = useState([null]);

  
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsCod, setSelectedItemsCod] = useState([]);




    // search cliente 
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [allData, setAllData] = useState([]); 

    useEffect(() => {
        // Realiza la consulta a la API y guarda los resultados en "allData"
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (response.ok) {
              const data = await response.json();
              
            //   setProducts(data);
              setAllData(data);
            } else {
              console.error('Error en la solicitud a la API');
            }
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
      
        fetchData();
      }, []);

    

    const handleInputChange = (e) => {

        // console.log(e.value.nombre);
        setSearchQuery(e.value); // Llama a setSearchQuery
        console.log("search ",searchQuery);

        onInputChange(e.value.id, 'cliente'); // Llama a onInputChange
      }
    //-------------------------------------------




    const [searchResultsDis, setSearchResultsDis] = useState([]);
    const [searchQueryDis, setSearchQueryDis] = useState('');
    const [allDataDis, setAllDataDis] = useState([]);

    const [searchResultsTipo, setSearchResultsTipo] = useState([]);
    const [searchQueryTipo, setSearchQueryTipo] = useState('');
    // const [allDataTipo, setAllDataTipo] = useState([]);

      const handleInputChangeDis = (e) => {

        console.log(e.value.nombre);
        if (!selectedItems.includes(e.value.nombre)) {
            setSelectedItems([...selectedItems, e.value.nombre]);
            setSelectedItemsCod([...selectedItemsCod, e.value.cod]);
          }
        setSearchQueryDis(e.value); // Llama a setSearchQuery
        onInputArrayChange(selectedItems, 'disciplina'); // Llama a onInputChange
      }


    const [allDataTipo] = useState([
        { label: 'EFECTIVO', value: 'EFECTIVO' },
        { label: 'TARJETA', value: 'TARJETA' },
        { label: 'QR', value: 'QR' }
        ]);
      




    const openNew = () => {
        setProduct(emptyProduct);
        setSelectedItems([]);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSelectedItems([]);

        setProduct(emptyProduct)
        setSubmitted(false);
        setProductDialog(false);
        setclienteDialog(false);
    };


    const saveProduct = async () => {
        setSubmitted(true);
      
        const fechaNueva = sumar30Dias(product.fechaI);
      
        const datos = {
          cliente: product.cliente,
          disciplina: selectedItems,
          fechaI: product.fechaI,
          fechaF: fechaNueva,
          pago: product.pago,
          monto: product.monto
        };
      
        await createMembresia(datos);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        getMembresias();
          setProduct(emptyProduct);
          setProductDialog(false);
      };
      
    


   
    const onInputChange = (e, name) => {
        let _product = { ...product };
        _product[`${name}`] = e;
        console.log(_product);
        setProduct(_product);
       
    };

    

    const handleInputChangeTipo = (e) => {

        console.log(e.value);
          
        setSearchQueryTipo(e.value); // Llama a setSearchQuery

        onInputChange(e.value, 'pago'); // Llama a onInputChange
    }

    const handleInputChangeFecha = (e) => {
        const selectedDate = e.value;
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');

        onInputChange(formattedDate, 'fechaI'); // Llama a onInputChange


    }

    


    //---------------------------------------

    const editProduct = (product) => {
        fetch('http://localhost:3000/api/membresia/'+product.id_cliente)

          .then((response) => {
            if (response.ok) {
              return response.json(); 
            } else {
              throw new Error('Error en la solicitud a la API');
            }
          })
          .then((data) => {
            console.log(data);
            setCliente(data);
          })
          .catch((error) => {
            console.error('Error al obtener datos de la API:', error);
          });
        setclienteDialog(true);
    };





    const exportCSV = () => {
        dt.current.exportCSV();
    };


    

    const onInputArrayChange = (e, name) => {


        // const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        // console.log("input change");
        // console.log(val.cod);

        // console.log(val.cliente);
        _product[`${name}`] = e;

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
                <Button label="Nuevo cliente" icon="pi pi-plus" severity="success" onClick={openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    // boton para cvs
    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const sumar30Dias = (fecha) => {
        const fechaParseada = parse(fecha, 'yyyy-MM-dd', new Date());
        const nuevaFecha = addDays(fechaParseada, 30);
        return format(nuevaFecha, 'yyyy-MM-dd');
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} /> */}
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Adminisitrar clientes</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="ok" icon="pi pi-check"  onClick={saveProduct} />
        </React.Fragment>
    );

    const clienteDialogFooter = (
        <React.Fragment>
            <Button label="Cerrar" icon="pi pi-times" outlined onClick={hideDialog} />
            {/* <Button label="ok" icon="pi pi-check"  onClick={saveProduct} /> */}
        </React.Fragment>
    );


    const deleteChip = (e) => {

        removeItem(e.value);

      }


    const removeItem = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove[0]);
    
    setSelectedItems(updatedItems);
    };


    return (
        <div>
            <SideBarPage/>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={membresias} 
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                        
                        

                    <Column field="id"  header="Membresia ID" sortable ></Column>
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="apellido" header="Apellido" ></Column>
                    <Column field="ci"  header="Carnet" sortable ></Column>
                    <Column field="fecha_inicio"  header="Inicio" sortable ></Column>
                    <Column field="fecha_fin"  header="Fin" sortable ></Column>

 
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            {/* crear uno nuevo */}
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle del cliente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                
            
                
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">
                        Nombre
                    </label>
                    <Dropdown  id='nombre' name='nombre' value={searchQuery} onChange={handleInputChange} options={allData} optionLabel="nombre" placeholder="Selecciona un cliente" className="w-full md:w-18rem" />
                </div>

                <div className="field">
                    <label htmlFor="disciplina" className="font-bold">
                        Disciplinas
                    </label>
                    
                    <Dropdown multiple  id='disciplina' name='disciplina' value={searchQueryDis} onChange={handleInputChangeDis} options={disciplinas} optionLabel="nombre" placeholder="Selecciona una disciplina" className="w-full md:w-18rem" />
                </div>

                
                <h3>Disciplinas seleccionadas</h3>
                <Chips value={selectedItems} onRemove={(e) => deleteChip(e)} />


                <div className="field">
                <label htmlFor="fecha" className="font-bold">
                    Fecha de inicio
                </label>
                <Calendar id="fecha"   value={product.fechaI} onChange={(e) => handleInputChangeFecha(e)} showIcon dateFormat="yy-mm-dd" required className={classNames({ "p-invalid": submitted && !product.fechaI, })}/>
                {submitted && !product.fechaI && (
                    <small className="p-error">
                    La fecha es requerida.
                    </small>
                )}
                </div>

                <div className="field">
                    {product.fechaI && (
                        <label htmlFor="fechaF" className="font-bold">
                        Vence en: {product.fechaF}
                        </label>
                    )}
                </div>


                <div className="field">
                    <label htmlFor="tipo" className="font-bold">
                        Tipo de pago
                    </label>
                    
                    <Dropdown  id='tipo' name='tipo' value={searchQueryTipo} onChange={handleInputChangeTipo} options={allDataTipo} optionLabel="value" placeholder="Pago" className="w-full md:w-18rem" />
                </div>
                

                <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="monto" className="font-bold">
                                    Monto
                                </label>
                                <InputNumber id="monto" value={product.monto} onValueChange={(e) => onInputNumberChange(e, 'monto')}  />
                            </div>
                            
                </div>



               
              
            </Dialog> 



            {/* visual */}
            {cliente && (
                
            <Dialog visible={clienteDialog} style={{ width: '35rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle del cliente" modal className="p-fluid" footer={clienteDialogFooter} onHide={hideDialog}>
                <div className="field" style={{ width: '30rem' }}>
                <label htmlFor="nombre" className="font-bold">
                    Nombre
                </label>
                <InputText id="nombre" value={cliente.datos[0].nombre} disabled />
                <label htmlFor="nombre" className="font-bold">
                    Apellido
                </label>
                <InputText id="nombre" value={cliente.datos[0].apellido} disabled />
                <label htmlFor="nombre" className="font-bold">
                    carnet
                </label>
                <InputText id="nombre" value={cliente.datos[0].ci} disabled />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div className="field">
                    {cliente.valores.map((valor, index) => (
                    <div key={index}>
                        <div className="card" style={{ width: '20rem' }}>
                        <Card title={valor.disciplina}>
                            <p className="m-0">dia: {valor.dia}</p>
                            <p className="m-0">horario de entrada: {valor.hora_inicio}</p>
                            <p className="m-0">horario de salida: {valor.hora_fin}</p>
                        </Card>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </Dialog>
)}



        
        </div>
    );
}
        