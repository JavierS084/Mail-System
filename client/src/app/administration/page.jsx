"use client";

import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useAdministrations } from "@/context/AdministrationContext";
import AdministrationForm from "@/components/AdministrationForm";
import AdministrationCard from "@/components/AdministrationCard";
import AdministrationNotification from "@/components/AdministrationNotification";

function AdmPage() {
  const { administrations, loadUsers, msg} = useAdministrations();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers();
    }, 1000);
    return () => clearTimeout(timer);
  }, [msg]);


  function renderlista() {
    if (administrations.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No hay Usuarios</h1>
          </div>
        </div>
      );
    } else {
      return <AdministrationCard administrations={administrations} />;
    }
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="listaUsers"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="listaUsers" title="Lista de Usuarios">
          <div
            className="tab-pane fade active show"
            id="listaUsers"
            role="tabpanel"
          >
            {renderlista()}
          </div>
        </Tab>
        <Tab eventKey="crearUsers" title="Crear Usuarios">
          <AdministrationForm />
        </Tab>
        <Tab eventKey="notification" title="Notificacion">
            <AdministrationNotification/>
        </Tab>
        <Tab eventKey="administracion" title="Administracion"></Tab>
      </Tabs>
    </div>
  );
}

export default AdmPage;
