import { useReporte_Entrada } from "../context/reporteentradaContext";
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
export default function Reporte_EntradaDemo() {
    const { reporte_Entrada, createNota_Entrada, getNotaaa, getNotas_Entrada } =
    useReporte_Entrada();
    //const[nota_entrada,setnotaentrada]=useState([])
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [montosPorMes, setMontosPorMes] = useState(Array(12).fill(0));
    const [mesSeleccionado, setMesSeleccionado] = useState(null);
    const [añoseleccionado, setAñoSeleccionado]=useState(null);
    const[fechaseleccionada, setfechaseleccionada]=useState(null);
    useEffect(() => {
        getNotas_Entrada();

    },[mesSeleccionado,añoseleccionado])
    console.log(mesSeleccionado)
    console.log(reporte_Entrada)
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

    const onMesChange = (event) => {
      setMesSeleccionado(event.value);
    };
    
    const onAñoChange = (event) => {
      setAñoSeleccionado(event.value);
    };
     /* const actualizarMontosPorMes = () => {
        nota_entrada.forEach(entrada => {
          const fecha = new Date(entrada.detalle[0].fecha);
          const mes = fecha.getMonth();
          console.log(mes)
          setMontosPorMes(prevMontos => {
            const nuevosMontos = [...prevMontos];
            console.log(mes)
            nuevosMontos[mes] += entrada.monto;
            console.log(nuevosMontos)
            return nuevosMontos;
          });
          setMontosPorMes(prevMontos => {
            const nuevosMontos = prevMontos.map((monto, index) => (index === mes ? monto + entrada.monto : monto));
            console.log(montosPorMes)
            return nuevosMontos;
          });
          
        });
      };  */
    
      const actualizarMontosPorMess = () => {
        let nuevosMontosPorMes = []; // Copia del estado actual [...montosPorMes]
        reporte_Entrada.forEach(entrada => {
          const fecha = new Date(entrada.productos[0].fecha);
          const mes = fecha.getMonth();
          const año=fecha.getFullYear()-2010;
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

      const actualizarMontosPorMesss = () => {
        let nuevosMontosPorMes = []; // Copia del estado actual [...montosPorMes]
       // const fechacalendario=formatDate(fechaseleccionada);
        
        reporte_Entrada.forEach(entrada => {
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

      const imprimirRep=()=>{
        const doc= new jsPDF();
        const columns=["Mes","Costos"];
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
        doc.text("Nota de Entrada Reporte",95,20)
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteDeEntrada.pdf');
      }

      const imprimirRepp=()=>{
        const doc= new jsPDF();
        const columns=["Nota_de_Entrada","Costos"];
        const data=[]
        const montosPorMess= actualizarMontosPorMess()
        //const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        for(let i=0; i<montosPorMess.length;i++){
          var dato=[`Nota_De_Entrada${i+1}`,`${montosPorMess[i]}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.text("Nota de Entrada Reporte",95,20)
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteDeEntrada.pdf');
      }

      const imprimirReppp=()=>{
        const doc= new jsPDF();
        const columns=["Notas_De_Entradas","Costos"];
        const data=[]
        const montosPorMess= actualizarMontosPorMesss()
       // const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        for(let i=0; i<montosPorMess.length;i++){
          var dato=[`Nota_de_Entrada${i+1}`,`${montosPorMess[i]}`]
          data.push(dato)
        }
        doc.autoTable({
          startY:30,
          head:[columns],
          body:data,
        })
        doc.text("Nota de Entrada Reporte",95,20)
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteDeEntrada.pdf');
      }

      const leftToolbarTemplate = () => {
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
      const leftToolbarTemplatee = () => {
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



      const actualizarMontosPorMes = () => {
        let nuevosMontosPorMes = [...montosPorMes]; // Copia del estado actual
        
        reporte_Entrada.forEach(entrada => {
          const fech=entrada.productos[0].fecha;
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
      console.log(fechaseleccionada)

      const formatDate = (selectedDate) => {
        if (selectedDate) {
          const formattedDate = new Date(selectedDate);
          const year = formattedDate.getFullYear();
          const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
          const day = formattedDate.getDate().toString().padStart(2, '0');
          return `${year}/${month}/${day}`;
        }
        return '';
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