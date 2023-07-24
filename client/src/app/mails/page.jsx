"use client";
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MailForm from "@/components/MailForm";
import MailCard from "@/components/MailCard";
import { useMails } from "@/context/MailsContext";

function Mail() {
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
            <h1 className="card-title">No existe correos disponibles</h1>
          </div>
        </div>
      );
    } else {
      return <MailCard mails={mails} />;
    }
  }
  //
  return (
    <div className="card">
      <div className="card-body">
        <Tabs
          defaultActiveKey="listMail"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="listMail" title="Correos">
            <div
              className="tab-pane fade active show"
              id="listaCorreos"
              role="tabpanel"
            >
              <article>{renderlista()}</article>
            </div>
          </Tab>
          <Tab eventKey="addmail" title="Crear Correo">
            <div
              className="tab-pane fade active show"
              id="createRequest"
              role="tabpanel"
            >
              {<MailForm />}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Mail;
