import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";

export default function SideBarPage() {
  const [visible, setVisible] = useState(false);
  const items = [
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: <Link to="/users">New User</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
          label: <Link to="/funcionalidades">New Functionality</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
          label: <Link to="/roles">New Rol</Link>,
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
      label: "Products",
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
      label: "Membresias",
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
        {
          label: <Link to="/membresia">Membresia</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: <Link to="/bitacora">Bitacora</Link>,
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
    },
  ];

  return (
    <div className="card flex justify-content-between bg-orange-200 ">
      <Sidebar
        className="bg-orange-300"
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
            src="https://static.vecteezy.com/system/resources/previews/006/406/317/non_2x/fitness-and-training-icons-gym-and-workout-vector.jpg"
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
