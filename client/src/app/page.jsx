"use client";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MailExpired from "@/components/MailExpired";
import { useMails } from "@/context/MailsContext";

export default function Home() {
  const { mails, loadMails, msg } = useMails();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMails();
    }, 1000);

    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (!mails.length) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No existe correos expirados</h1>
          </div>
        </div>
      );
    } else {
      return <MailExpired mails={mails} />;
    }
  }
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Bienvenido...</h1>
        <Tabs
          defaultActiveKey="listaUsers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="listaUsers" title="Dashboard">
            <div
              className="tab-pane fade active show"
              id="listaUsers"
              role="tabpanel"
            ></div>
          </Tab>
          <Tab eventKey="mailexpired" title="Correos Expirados">
            <article>{renderlista()}</article>
          </Tab>

          <Tab eventKey="administracion" title="Administracion"></Tab>
        </Tabs>
      </div>
    </div>
  );
}
