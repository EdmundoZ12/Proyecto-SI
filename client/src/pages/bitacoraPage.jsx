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
import { da } from 'date-fns/locale';
import { Card } from 'primereact/card';

//-------------------------

import { TabView, TabPanel } from 'primereact/tabview';
import { Timeline } from 'primereact/timeline';
import { addDays, format, parse, subMonths, subWeeks } from 'date-fns';



    


export default function BitacoraDemo() {


  const [allData, setAllData] = useState([]); 
    
  useEffect(() => {
        
    fetch('http://localhost:3000/api/bitacoras')
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Error en la solicitud a la API');
        }
      })
      .then((data) => {
        setAllData(data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });


      prueba();
  }, []);

  //variable para el dia
  const now =addDays(new Date(), 0);
  const week =subWeeks(now, 0);
  const month =subMonths(now, 0);

  const dataDay = allData.filter(item => {
    // console.log(item["fecha_hora"]);

    return item["fecha_hora"] >= now;
  });

  const prueba = ()=>{
      console.log("entro");
      allData.forEach(element => {
        console.log(element["fecha_hora"]);

        const fechaParseada = parse(element["fecha_hora"], 'yyyy-MM-dd', new Date());
        element["fecha_hora"] = fechaParseada;

      });
      console.log(allData);
  };



    return (
        <div>
            <SideBarPage/>
            
            <div className="card">
                <TabView>
                    <TabPanel header="Dia">
                        <p>r adipisicing elit. Modi voluptas deserunt, quaerat nemo maxime </p>
                        <Timeline value={allData} align='alternate' />
                    </TabPanel>
                    
                    <TabPanel header="Semana">
                      <Timeline value={dataDay} align='alternate' />
                        <p>Lorem, ipsum dolor sit ametuaerat nemo maxime </p>
                    </TabPanel>
                    
                    <TabPanel header="Mes">
                        <p>Lorem, ipsum dolor tetur adipisicing elit. Modi voluptas deserunt, quaera </p>
                    </TabPanel>


                </TabView>
            </div>







        
        </div>
    );
}
        