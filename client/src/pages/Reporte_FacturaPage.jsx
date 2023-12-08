import { useReporteFactura } from "../context/reportefacturaContext";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useAuth } from "../context/authContext";
import {jsPDF} from "jspdf"
import "jspdf-autotable"
import logo from '../images/Logo.jpeg'
import { Chart } from 'primereact/chart';
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { Calendar } from 'primereact/calendar';
import SideBarPage from "./SideBarPage";

export default function ReporteFacturaDemo() {
    const { factura, creaFactura, getFacturas } =
    useReporteFactura();
    //const[nota_entrada,setnotaentrada]=useState([])
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [montosPorMes, setMontosPorMes] = useState(Array(12).fill(0));
    const [mesSeleccionado, setMesSeleccionado] = useState(null);
    const [añoseleccionado, setAñoSeleccionado]=useState(null);
    const[fechaseleccionada, setfechaseleccionada]=useState(null);
    useEffect(() => {
        getFacturas();
    },[mesSeleccionado,añoseleccionado])

    //console.log(reporte_Entrada)

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
    const onAñoChange = (event) => {
      setAñoSeleccionado(event.value);
    };

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
    const actualizarMontosPorMes = () => {
      let nuevosMontosPorMes = [...montosPorMes]; // Copia del estado actual
      console.log(factura)
      
      factura.forEach(entrada => {
        const fech=entrada.productos[0].fecha;
        console.log(fech)
        const fecha = new Date(fech);
        const mes = fecha.getMonth();
        const año= fecha.getFullYear()-2010;
        const montoDecimal = parseFloat(entrada.monto);
        if (añoseleccionado==año) {
          nuevosMontosPorMes = nuevosMontosPorMes.map((monto, index) =>
          index === mes ? monto + montoDecimal : monto
        );
        }
      });
    
     // console.log(nuevosMontosPorMes); // Puedes imprimir la variable si lo necesitas
      return nuevosMontosPorMes;
    };  

    console.log(factura)

    const actualizarMontosPorMess = () => {
      let nuevosMontosPorMes = []; // Copia del estado actual [...montosPorMes]
      factura.forEach(entrada => {
        const fecha = new Date(entrada.productos[0].fecha);
        const mes = fecha.getMonth();
        const año=fecha.getFullYear()-2010;
        const montoDecimal = parseFloat(entrada.monto);
        if (mesSeleccionado==mes && año==añoseleccionado) {
           nuevosMontosPorMes.push(montoDecimal)
        }  
      });
      return nuevosMontosPorMes;
    };
      

      

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
      const verReporte=()=>{
        const montosPorMess= actualizarMontosPorMes()
        console.log(montosPorMess)
        const data = {
            labels: ['ENE', 'FEB', 'MAR', 'ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'],
            datasets: [
                {
                    label: 'Ganancias',
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

      const verReportee=()=>{
        const montosPorMess= actualizarMontosPorMess()
       // console.log(montosPorMess)
       const labelss=[];
       for (let index = 0; index < montosPorMess.length; index++) {
          labelss.push(`Factura${index}`)
        
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

      const verReporteee=()=>{
        const montosPorMess= actualizarMontosPorMesss()
       // console.log(montosPorMess)
       const labelss=[];
       for (let index = 0; index < montosPorMess.length; index++) {
          labelss.push(`Factura${index}`)
        
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
        
        factura.forEach(entrada => {
          const fecha = new Date(entrada.productos[0].fecha);
          const mes = fecha.getMonth();
          const año=fecha.getFullYear();
          const dia=fecha.getDate()+1;
          const montoDecimal = parseFloat(entrada.monto);
          if (fechaseleccionada.getMonth()==mes && año==fechaseleccionada.getFullYear() && dia==fechaseleccionada.getDate()) {
             nuevosMontosPorMes.push(montoDecimal)
            //nuevosMontosPorMes.map((monto, index) =>
           // index === mes ? monto + entrada.monto : monto
         // );
          }
          
        });
        
        console.log(nuevosMontosPorMes); // Puedes imprimir la variable si lo necesitas
        return nuevosMontosPorMes;
      };

      const leftToolbarTemplateee = () => {
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

      const imprimirRep=()=>{
        const doc= new jsPDF();
        const columns=["Mes","Ganancia"];
        const data=[]
        const montosPorMess= actualizarMontosPorMes()
        const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        for(let i=0; i<montosPorMess.length;i++){
          var dato=[`${meses[i]}`,`${montosPorMess[i]}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.text("Factura Reporte",95,20)
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteFacturas.pdf');
      }

      const imprimirRepp=()=>{
        const doc= new jsPDF();
        const columns=["Factura","Ganancias"];
        const data=[]
        const montosPorMess= actualizarMontosPorMess()
        for(let i=0; i<montosPorMess.length;i++){
          var dato=[`Factura${i+1}`,`${montosPorMess[i]}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.text("Factura Reporte",95,20)
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteDeFactura.pdf');
      }

      const imprimirReppp=()=>{
        const doc= new jsPDF();
        const columns=["Facturas","Ganancias"];
        const data=[]
        const montosPorMess= actualizarMontosPorMesss()
       // const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        for(let i=0; i<montosPorMess.length;i++){
          var dato=[`Factura${i+1}`,`${montosPorMess[i]}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.text("Factura Reporte",95,20)
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteDeFactura.pdf');
      }

      const leftToolbarTemplate = () => {
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
      const rightToolbarTemplatee = () => {
        return (
          <Button
            label="Imprimir"
            icon="pi pi-upload"
            className="p-button-help"
            onClick={imprimirRepp}
          />
        );
      };

      const rightToolbarTemplateee = () => {
        return (
          <Button
            label="Imprimir"
            icon="pi pi-upload"
            className="p-button-help"
            onClick={imprimirReppp}
          />
        );
      };

    return(
    <div>  
        <SideBarPage/>
        <div className="card">
        <TabView>
            <TabPanel header="Reporte Por Año">
            <Toolbar
               className="mb-4"
               left={leftToolbarTemplate}
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
            <TabPanel header="Reporte Por Meses">
            <Dropdown
               value={mesSeleccionado}
               options={dropdownOptions}
               onChange={onMesChange}
              placeholder="Seleccione un mes"
           />
                  <Toolbar
                     className="mb-4"
                     left={leftToolbarTemplatee}
                     right={rightToolbarTemplatee}

                   ></Toolbar>
           
                   <Chart type="bar" data={chartData} options={chartOptions} />
            </TabPanel>

            <TabPanel header="Reporte Por Dia">
            <Calendar value={fechaseleccionada} onChange={(e) => setfechaseleccionada(e.value)} showTime={false} showIcon />
                  <Toolbar
                     className="mb-4"
                     left={leftToolbarTemplateee}
                     right={rightToolbarTemplateee}

                   ></Toolbar>
           
                   <Chart type="bar" data={chartData} options={chartOptions} />
            </TabPanel>
          </TabView> 
          </div>
    </div>       
    )  
}