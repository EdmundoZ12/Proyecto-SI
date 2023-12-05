import { useClimem } from "../context/reporteclimemContext";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useAuth } from "../context/authContext";
import {jsPDF} from "jspdf"
import "jspdf-autotable"
import logo from '../images/Logo.jpeg'
import { Chart } from 'primereact/chart';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SideBarPage from "./SideBarPage";
import { Toolbar } from "primereact/toolbar";
import { TabView, TabPanel } from 'primereact/tabview';
export default function ReporteCliMemDemo() {
    const { climem, getClienMemb} =
    useClimem();
    const {entest, getEntrenadorEstu}=useClimem();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
   // const [montosPorMes, setMontosPorMes] = useState(Array(12).fill(0));

    useEffect(() => {
        getClienMemb();
        getEntrenadorEstu();
    },[])
    console.log(climem)
    const leftToolbarTemplate = () => {
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              label="Imprimir"
              severity="success"
              onClick={imprimirRep}
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
        for(let i=0; i<entest.length;i++){
          var dato=[`${entest[i].nombre_entrenador}`,`${entest[i].nombre_cliente}`,`${entest[i].nombre_disciplina}`]
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
                <DataTable
          value={entest}
          
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
                <Button
                  label="Imprimir"
                  severity="success"
                  onClick={imprimirRepEntre}
                />
                </TabPanel>
                <TabPanel header="Header III">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
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