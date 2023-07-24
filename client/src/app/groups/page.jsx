"use client";
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GroupCard from "@/components/GroupsCard";
import GroupForm from "@/components/GroupsForm";
import { useGroups } from "@/context/GroupsContext";

function Request() {
  const { groups, loadGroups, msg } = useGroups();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadGroups();
    }, 1000);

    return () => clearTimeout(timer);
  }, [msg]);

  function renderlista() {
    if (groups.length === 0) {
      return (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">No existe Grupos disponibles</h1>
          </div>
        </div>
      );
    } else {
      return <GroupCard groups={groups} />;
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <Tabs
          defaultActiveKey="groupsList"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="groupsList" title="Grupos">
            <div
              className="tab-pane fade active show"
              id="listaGrupos"
              role="tabpanel"
            >
              <article>{renderlista()}</article>
            </div>
          </Tab>
          <Tab eventKey="addDependency" title="Crear Grupos">
            <div
              className="tab-pane fade active show"
              id="createRequest"
              role="tabpanel"
            >
              {<GroupForm />}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Request;
