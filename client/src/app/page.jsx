"use client"
import { useEffect, useState } from "react"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function Home() {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Bienvenido...</h1>
         <Tabs
        defaultActiveKey="listaUsers"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="listaUsers" title="Buscar Correos">
          <div
            className="tab-pane fade active show"
            id="listaUsers"
            role="tabpanel"
          >
            
          </div>
        </Tab>
        <Tab eventKey="crearUsers" title="Correos Vencidos">
          
        </Tab>
        <Tab eventKey="roles" title="Roles"></Tab>
        <Tab eventKey="administracion" title="Administracion"></Tab>
      </Tabs>
      </div>
  
    </div>
  )
}

