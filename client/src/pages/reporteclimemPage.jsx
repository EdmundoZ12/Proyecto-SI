import { useClimem } from "../context/reporteclimemContext";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useAuth } from "../context/authContext";
import {jsPDF} from "jspdf"
import "jspdf-autotable"
import logo from '../images/Logo.jpeg'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SideBarPage from "./SideBarPage";
import { useEntrenadores } from "../context/entrenadorContext";
import { TabView, TabPanel } from 'primereact/tabview';
import { Chart } from 'primereact/chart';
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
export default function ReporteCliMemDemo() {
    const { climem, getClienMemb} =
    useClimem();
    const {entest, getEntrenadorEstu}=useClimem();
    const {membresias, getMembresiass}=useClimem();
    const {pago,getPagoo}=useClimem();
    const [añoseleccionado, setAñoSeleccionado]=useState(null);
    const [entrenadorseleccionado,setEntrenadorSeleccionado]=useState(null);
    const [montosPorMes, setMontosPorMes] = useState(Array(12).fill(0));
    const [mesSeleccionado, setMesSeleccionado] = useState(null);
    const[fechaseleccionada, setfechaseleccionada]=useState(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { entrenadores, getEntrenadores } =useEntrenadores();
    const [estudiantesFiltrados, setEstudiantesFiltrados] = useState([]);
   // const [montosPorMes, setMontosPorMes] = useState(Array(12).fill(0));

    useEffect(() => {
        getClienMemb();
        getEntrenadorEstu();
        getMembresiass();
        getEntrenadores();
    },[mesSeleccionado,añoseleccionado,entest])
   // console.log(membresias)
    const right = () => {
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              label="Imprimir"
              severity="success"
              onClick={imprimirRepEntre}
            />
          </div>
        );
      };
    
      const imprimirRep=()=>{
        const doc= new jsPDF();
        const columns=["Nombre","Apellido","Disciplina Inscrita"];
        const data=[]
       // const montosPorMess= actualizarMontosPorMess()
       // const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        for(let i=0; i<climem.length;i++){
          var dato=[`${climem[i].nombre}`,`${climem[i].apellido}`,`${climem[i].nombre_disciplina}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('Disciplinas.pdf');
      }  
      const imprimirRepEntre=()=>{
        const doc= new jsPDF();
        const columns=["Entenador","Estudiante","Disciplina Inscrita"];
        const data=[]
       // const montosPorMess= actualizarMontosPorMess()
       // const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        for(let i=0; i<estudiantesFiltrados.length;i++){
          var dato=[`${estudiantesFiltrados[i].nombre_entrenador}`,`${estudiantesFiltrados[i].nombre_cliente}`,`${estudiantesFiltrados[i].nombre_disciplina}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('Estudiantes.pdf');
      }  

    
      async function obtenerDatos() {
        try {
          const pago = await getPagoo(1);
      //    console.log(pago);  // Aquí puedes usar 'pago' como cualquier otra variable
          return pago;  // Si deseas retornar el valor para usarlo en otro lugar
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
      
      // Llamar a la función
     // const resultado = obtenerDatos();
   //   console.log(resultado)
    
   // const id=membresias[0].id_pago;
   /* const pago=getPagoo(1);
    
    pago.then(data => {
      console.log(data.datos);
      const a=data.datos[0].monto;
      console.log(a)
  }).catch(error => {
      console.error('Error al obtener los datos:', error);
  });
  console.log(a)*/
  const dropdownOptions2 = [
    { label: '2010', value: 0 },
    { label: '2011', value: 1 },
    { label: '2012', value: 2 },
    { label: '2013', value: 3 },
    { label: '2014', value: 4 },
    { label: '2015', value: 5 },
    { label: '2016', value: 6 },
    { label: '2017', value: 7 },
    { label: '2018', value: 8 },
    { label: '2019', value: 9 },
    { label: '2020', value: 10 },
    { label: '2021', value: 11 },
    { label: '2022', value: 12 },
    { label: '2023', value: 13 },
  ];
  //console.log(entrenadores)
  const nombresUnicos = new Set(entrenadores.map(entrenador => entrenador.nombre_entrenador));

// Construir el array de opciones para el Dropdown
const dropdownOptions3 = [...nombresUnicos].map(nombre => ({
  label: nombre,
  value: nombre
}));

  const onAñoChange = (event) => {
    setAñoSeleccionado(event.value);
  };

  const onEntrenadorChange=(event)=>{
    setEntrenadorSeleccionado(event.value)
  }
    
  const leftToolbarTemplatee = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Ver"
          severity="success"
          onClick={verReportee}
        />
      </div>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Imprimir"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={imprimirRep}
      />
    );
  };  
 // console.log(membresias)
  const actualizarMontosPorMes = () => {
    let nuevosMontosPorMes = [...montosPorMes]; // Copia del estado actual
    
    membresias.forEach(entrada => {
      //const fecha = new Date(entrada.detalle[0].fecha);
    //  console.log(entrada.fecha_inicio);
      const fech=entrada.fecha_inicio;
     // console.log(fech)
      const fechh=new Date(fech);
      const mes = fechh.getMonth();
      const año= fechh.getFullYear()-2010;
      console.log(mes)
      const montoDecimal = parseFloat(entrada.monto);
      if (añoseleccionado==año) {
        nuevosMontosPorMes = nuevosMontosPorMes.map((monto, index) =>
        index === mes ? monto + montoDecimal : monto
      );
      }
    });
  
    console.log(nuevosMontosPorMes); // Puedes imprimir la variable si lo necesitas
    return nuevosMontosPorMes;
  };

  const verReportee=()=>{
    const montosPorMess= actualizarMontosPorMes()
    console.log(montosPorMess)
    const data = {
        labels: ['ENE', 'FEB', 'MAR', 'ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'],
        datasets: [
            {
                label: 'Costos de Productos',
                data: montosPorMess,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(18, 43, 249, 1)',
                    'rgba(34, 43, 70, 1)',
                    'rgba(54, 206, 199, 0.8)',
                    'rgba(54, 206, 50, 0.8)',
                    'rgba(226, 206, 50, 1)',
                    'rgba(255, 0, 71, 0.5)',
                    'rgba(255, 0, 71, 0.5)',
                    'rgba(255, 0, 71, 0.5)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(18, 43, 249)',
                    'rgb(34, 43, 70)',
                    'rgb(54, 206, 199)',
                    'rgb(54, 206, 50)',
                    'rgb(226, 206, 50)',
                    'rgb(255, 0, 71)',
                    'rgb(255, 0, 71)',
                    'rgb(255, 0, 71)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
  
    setChartData(data);
    setChartOptions(options);
    
  }

  const dropdownOptions = [
    { label: 'Enero', value: 0 },
    { label: 'Febrero', value: 1 },
    { label: 'Marzo', value: 2 },
    { label: 'Abril', value: 3 },
    { label: 'Mayo', value: 4 },
    { label: 'Junio', value: 5 },
    { label: 'Julio', value: 6 },
    { label: 'Agosto', value: 7 },
    { label: 'Septiembre', value: 8 },
    { label: 'Octubre', value: 9 },
    { label: 'Noviembre', value: 10 },
    { label: 'Diciembre', value: 11 },
  ];

  const onMesChange = (event) => {
    setMesSeleccionado(event.value);
  };

  const leftToolbarTemplateee = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Ver"
          severity="success"
          onClick={verReporte}
        />
      </div>
    );
  };

  const verReporte=()=>{
    const montosPorMess= actualizarMontosPorMess()
   // console.log(montosPorMess)
   const labelss=[];
   for (let index = 0; index < montosPorMess.length; index++) {
      labelss.push(`Nota_Entrada${index}`)
    
   }
    const data = {
        labels: labelss,
        datasets: [
            {
                label: 'Membresias Vendidas',
                data: montosPorMess,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(18, 43, 249, 1)',
                    'rgba(34, 43, 70, 1)',
                    'rgba(54, 206, 199, 0.8)',
                    'rgba(54, 206, 50, 0.8)',
                    'rgba(226, 206, 50, 1)',
                    'rgba(255, 0, 71, 0.5)',
                    'rgba(255, 0, 71, 0.5)',
                    'rgba(255, 0, 71, 0.5)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(18, 43, 249)',
                    'rgb(34, 43, 70)',
                    'rgb(54, 206, 199)',
                    'rgb(54, 206, 50)',
                    'rgb(226, 206, 50)',
                    'rgb(255, 0, 71)',
                    'rgb(255, 0, 71)',
                    'rgb(255, 0, 71)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
  
    setChartData(data);
    setChartOptions(options);
    
  }

  const actualizarMontosPorMess = () => {
    let nuevosMontosPorMes = []; // Copia del estado actual [...montosPorMes]
    membresias.forEach(entrada => {
      const fech=entrada.fecha_inicio;
     // console.log(fech)
      const fechh=new Date(fech);
      const mes = fechh.getMonth();
      const año= fechh.getFullYear()-2010;
      const montoDecimal = parseFloat(entrada.monto);
      if (mesSeleccionado==mes && año==añoseleccionado) {
         nuevosMontosPorMes.push(montoDecimal)
        //nuevosMontosPorMes.map((monto, index) =>
       // index === mes ? monto + entrada.monto : monto
     // );
      }
    });
    return nuevosMontosPorMes;
  };


  const leftToolbarTemplateeee = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Ver"
          severity="success"
          onClick={verReporteee}
        />
      </div>
    );
  };

  const verReporteee=()=>{
    const montosPorMess= actualizarMontosPorMesss()
   // console.log(montosPorMess)
   const labelss=[];
   for (let index = 0; index < montosPorMess.length; index++) {
      labelss.push(`Nota_Entrada${index}`)
    
   }
    const data = {
        labels: labelss,
        datasets: [
            {
                label: 'Costos de Productos',
                data: montosPorMess,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(18, 43, 249, 1)',
                    'rgba(34, 43, 70, 1)',
                    'rgba(54, 206, 199, 0.8)',
                    'rgba(54, 206, 50, 0.8)',
                    'rgba(226, 206, 50, 1)',
                    'rgba(255, 0, 71, 0.5)',
                    'rgba(255, 0, 71, 0.5)',
                    'rgba(255, 0, 71, 0.5)'
                  ],
                  borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(18, 43, 249)',
                    'rgb(34, 43, 70)',
                    'rgb(54, 206, 199)',
                    'rgb(54, 206, 50)',
                    'rgb(226, 206, 50)',
                    'rgb(255, 0, 71)',
                    'rgb(255, 0, 71)',
                    'rgb(255, 0, 71)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
  
    setChartData(data);
    setChartOptions(options);
    
  }

  const actualizarMontosPorMesss = () => {
    let nuevosMontosPorMes = []; // Copia del estado actual [...montosPorMes]
   // const fechacalendario=formatDate(fechaseleccionada);
    
    membresias.forEach(entrada => {
      const fech=entrada.fecha_inicio;
     // console.log(fech)
      const fechh=new Date(fech);
      const mes = fechh.getMonth();
      const año= fechh.getFullYear();
      const dia=fechh.getDate()
      console.log(dia)
      const montoDecimal = parseFloat(entrada.monto);
      if (fechaseleccionada.getMonth()==mes && año==fechaseleccionada.getFullYear() && dia==fechaseleccionada.getDate()) {
         nuevosMontosPorMes.push(montoDecimal)
         console.log(montoDecimal)
        //nuevosMontosPorMes.map((monto, index) =>
       // index === mes ? monto + entrada.monto : monto
     // );
      }
      
    });
    
    //console.log(nuevosMontosPorMes); // Puedes imprimir la variable si lo necesitas
    return nuevosMontosPorMes;
  };

  const verEstudiantes = () => {
    // Filtrar estudiantes por el entrenador seleccionado
    const estudiantesFiltrados = entest.filter(estudiante => estudiante.nombre_entrenador === entrenadorseleccionado);
    setEstudiantesFiltrados(estudiantesFiltrados);
  };

  const left=()=>{
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Ver"
          severity="success"
          onClick={verEstudiantes}
        />
      </div>
    );
  }
  
  //console.log(entest)

    return(
       <div>
        <SideBarPage />
        <div className="card">
        
        <TabView>
                <TabPanel header="Disciplina">
                <DataTable
          value={climem}
          
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
         
        >
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
            field="nombre_disciplina"
            header="Disciplina"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
        </DataTable>
                <Button
                  label="Imprimir"
                  severity="success"
                  onClick={imprimirRep}
                />
                </TabPanel>
                <TabPanel header="Estudiantes">
                <Toolbar
               className="mb-4"
               left={left}
               right={right}

            ></Toolbar>
                <Dropdown
               value={entrenadorseleccionado}
               options={dropdownOptions3}
               onChange={onEntrenadorChange}
              placeholder="Seleccione un Entrenador"
           />
                <DataTable
          value={estudiantesFiltrados}
          
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
         
        >
          <Column
            field="nombre_entrenador"
            header="Entrenador"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="nombre_cliente"
            header="Estudiante"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="nombre_disciplina"
            header="Disciplina"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
        </DataTable>
                
                </TabPanel>
                <TabPanel header="Membresias Vendidas Por Año">
                <Toolbar
               className="mb-4"
               left={leftToolbarTemplatee}
               right={rightToolbarTemplate}

            ></Toolbar>
             <Dropdown
               value={añoseleccionado}
               options={dropdownOptions2}
               onChange={onAñoChange}
              placeholder="Seleccione un Año"
           />
           
            <Chart type="bar" data={chartData} options={chartOptions} />
                </TabPanel>

                <TabPanel header="Membresias Por Mes">
                <Toolbar
               className="mb-4"
               left={leftToolbarTemplateee}
               right={rightToolbarTemplate}

            ></Toolbar>
                <Dropdown
               value={mesSeleccionado}
               options={dropdownOptions}
               onChange={onMesChange}
              placeholder="Seleccione un mes"
           />
           
                   <Chart type="bar" data={chartData} options={chartOptions} />
                </TabPanel>

                <TabPanel header="Reporte Por Dia">
            <Calendar value={fechaseleccionada} onChange={(e) => setfechaseleccionada(e.value)} showTime={false} showIcon />
                  <Toolbar
                     className="mb-4"
                     left={leftToolbarTemplateeee}
                     right={rightToolbarTemplate}

                   ></Toolbar>
           
                   <Chart type="bar" data={chartData} options={chartOptions} />
            </TabPanel>
            </TabView>
           
        {/* <DataTable
          value={climem}
          
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
         
        >
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
            field="nombre_disciplina"
            header="Disciplina"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
        </DataTable> */}
        </div>
       </div>
    )  
}