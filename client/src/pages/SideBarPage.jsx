import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";
import logo from "../assets/Borcelle.png"
import { useAuth } from "../context/authContext";


export default function SideBarPage() {
  const [visible, setVisible] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
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
          label: <Link to="/inventarios">Inventario</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/nota-de-entrada">Nota de Entrada</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/facturas">Factura</Link>,
          icon: "pi pi-fw pi-plus",
        },
      ],
    },
    {
      label: "Gestion de Membresias",
      icon: "pi pi-fw pi-bolt",
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
        },{
          label: <Link to="/cliente">Cliente</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/membresia">Membresia</Link>,
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
    {
      label: "Reportes",
      icon: "pi pi-fw pi-chart-bar",
      items: [
        {
          label: <Link to="/reporteentrada">Nota De Entrada</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/reportefactura">Facturas</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/reporteclimem">Membresias</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/bitacora">Bitacora</Link>,
          icon: "pi pi-fw pi-plus",
        },
      ],
    }
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
      {/* <i style={{ color: "white", fontWeight: "bold" ,fontSize:"25px",marginRight:"20px"}}>Welcome {user.username}</i> */}
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem",marginRight:"20px" }}></i>
        <i className="pi pi-spin pi-cog" style={{ fontSize: "2rem",marginRight:"20px" }}></i>
        <i style={{ fontSize: "2rem" ,background:"orange",borderRadius:"10px",}} >
              <Link to="/" onClick={() => logout()} style={{ fontSize: "2rem" }}>
                Logout
              </Link>
            </i>
      </div>
    </div>
  );
}
