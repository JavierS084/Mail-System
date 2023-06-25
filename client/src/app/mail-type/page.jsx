"use client";
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MailTypesForm from "@/components/MailTypesForm";
import MailTypesCard from "@/components/MailTypesCard";
import { useMailTypes } from "@/context/MailTypeContext";

function MailTypesPage() {
  const { MailTypes, loadTypes, msg } = useMailTypes();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTypes();
    }, 1000);

    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (MailTypes.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No existen tipos de correos disponibles</h1>
          </div>
        </div>
      );
    } else {
      return <MailTypesCard MailTypes={MailTypes} />;
    }
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="listMailtypes"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="listMailtypes" title="Tipo de Correo">
          <div
            className="tab-pane fade active show"
            id="listaSolicituds"
            role="tabpanel"
          >
            <article>{renderlista()}</article>
          </div>
        </Tab>
        <Tab eventKey="addtype" title="Crear Tipo de correo">
          <div
            className="tab-pane fade active show"
            id="createRequest"
            role="tabpanel"
          >
            {<MailTypesForm />}
          </div>
        </Tab>
        
      </Tabs>
    </div>
  );
}

export default MailTypesPage;
