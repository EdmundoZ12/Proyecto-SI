import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";
import logo from "../assets/Borcelle.png"


export default function SideBarPage() {
  const [visible, setVisible] = useState(false);
  const items = [
    {
      label: "Gestion de Usuario",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: <Link to="/users">Usuario</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
          label: <Link to="/funcionalidades">Funcionalidad</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
          label: <Link to="/roles">Rol</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
       
      ],
    },
    {
      label: "Gestion de producto",
      icon: "pi pi-fw pi-cart-plus",
      items: [
        {
          label: <Link to="/productos">Productos</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/categorias">Categorias</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/proveedores">Proveedores</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/inventario">Inventario</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/inventarios">Inventario2</Link>,
          icon: "pi pi-fw pi-plus",
        },
        ,
        {
          label: <Link to="/nota-de-entrada">Nota de Entrada</Link>,
          icon: "pi pi-fw pi-plus",
        },
      ],
    },
    {
      label: "Gestion de Membresias",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: <Link to="/disciplinas">Disciplinas</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/horario">Horarios</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/entrenador">Entrenadores</Link>,
          icon: "pi pi-fw pi-plus",
        },
        /*{
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },*/
      ],
    },
    /*{
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archive",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },*/
  ];
  const sidebar={
    backgroundColor: '#151623',
  }

  return (
    <div className="card flex justify-content-between " style={sidebar}>
      <Sidebar
       style={sidebar}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            style={{
              width: "50%",
              borderRadius: "50%", // Imagen circular
              background: "transparent", // Fondo de la imagen transparente
            }}
            alt="Descripción de la imagen"
          />
          <br />
        </div>
        <PanelMenu
          model={items}
          className="w-full md:w-18rem"
          style={{ background: "black", padding: "10px", borderRadius: "15px" }}
        />
      </Sidebar>
      <Button
        icon="pi pi-arrow-right"
        style={{ color: "orange" }}
        onClick={() => setVisible(true)}
        className="bg-black-alpha-90"
      />
      <div className="flex align-items-center">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        <i className="pi pi-spin pi-cog" style={{ fontSize: "2rem" }}></i>
      </div>
    </div>
  );
}
