import { useReporte_Entrada } from "../context/reporteentradaContext";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useAuth } from "../context/authContext";
import {jsPDF} from "jspdf"
import "jspdf-autotable"
import logo from '../images/Logo.jpeg'
import { Chart } from 'primereact/chart';
import { Toolbar } from "primereact/toolbar";
import SideBarPage from "./SideBarPage";  
export default function Reporte_EntradaDemo() {
    const { reporte_Entrada, createNota_Entrada, getNotaaa } =
    useReporte_Entrada();
    //const[nota_entrada,setnotaentrada]=useState([])
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [montosPorMes, setMontosPorMes] = useState(Array(12).fill(0));

    useEffect(() => {
        getNotaaa()
    },[])

    console.log(reporte_Entrada)

      const actualizarMontosPorMes = () => {
        nota_entrada.forEach(entrada => {
          const fecha = new Date(entrada.detalle[0].fecha);
          const mes = fecha.getMonth();
          console.log(mes)
          /*setMontosPorMes(prevMontos => {
            const nuevosMontos = [...prevMontos];
            console.log(mes)
            nuevosMontos[mes] += entrada.monto;
            console.log(nuevosMontos)
            return nuevosMontos;
          });*/
          setMontosPorMes(prevMontos => {
            const nuevosMontos = prevMontos.map((monto, index) => (index === mes ? monto + entrada.monto : monto));
            console.log(montosPorMes)
            return nuevosMontos;
          });
          
        });
      };  
    
      const actualizarMontosPorMess = () => {
        let nuevosMontosPorMes = [...montosPorMes]; // Copia del estado actual
        
        reporte_Entrada.forEach(entrada => {
          const fecha = new Date(entrada.detalle[0].fecha);
          const mes = fecha.getMonth();
          
          nuevosMontosPorMes = nuevosMontosPorMes.map((monto, index) =>
            index === mes ? monto + entrada.monto : monto
          );
        });
      
        console.log(nuevosMontosPorMes); // Puedes imprimir la variable si lo necesitas
        return nuevosMontosPorMes;
      };
      

      const verReporte=()=>{
        const montosPorMess= actualizarMontosPorMess()
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

      const imprimirRep=()=>{
        const doc= new jsPDF();
        const columns=["Mes","Costos"];
        const data=[]
        const montosPorMess= actualizarMontosPorMess()
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
        doc.addImage(logo,'JPEG',10,10,20,20)
        doc.save('ReporteDeEntrada.pdf');
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

    return(
    <div>
        <SideBarPage/>
        <div className="card">
           <Toolbar
               className="mb-4"
               left={leftToolbarTemplate}
               right={rightToolbarTemplate}

            ></Toolbar>
           
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
   </div>
    )  
}