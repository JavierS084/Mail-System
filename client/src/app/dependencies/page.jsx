"use client";
import { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DependenciesCard from "@/components/DependenciesCard";
import DependenciesAdd from "@/components/DependenciesForm";
import { useDependencies } from "@/context/DependenciesContext";
import  Search  from "@/components/Search";

export default function DependenciasPage() {
  const { dependencies, loadDependencies } = useDependencies();


  useEffect(() => {
    const timer = setTimeout(() => {
      loadDependencies();
    }, 1000);

    return () => clearTimeout(timer);
  }, [ dependencies]);



  function renderlista() {
    if (dependencies.length === 0) {
      return (
        <div className="p-4">
          <h2>No hay dependencias disponibles</h2>
        </div>
      );
    } else {
      return <DependenciesCard dependencies={dependencies} />;
    }
  }
//https://react-bootstrap.github.io/components/tabs/ para mejorar el tab
  return (
    <div>
      <Tabs
      defaultActiveKey="listDependencies"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="listDependencies" title="Dependencias" >
      <div
          className="tab-pane fade active show"
          id="listadependencias"
          role="tabpanel"
        >
          <article>{renderlista()}</article>
        </div>
      </Tab>
      <Tab eventKey="addDependency" title="Crear Dependencia">
      <div
          className="tab-pane fade active show"
          id="createdependencies"
          role="tabpanel"
        >
          {<DependenciesAdd />}
        </div>
      </Tab>
      <Tab eventKey="searchDependencia" title="Buscar Dependencia" >
      <div
          className="tab-pane fade active show"
          id="searchdependencias"
          role="tabpanel"
        >
          { <Search />}
        </div>
      </Tab>
    </Tabs>
    
      
    </div>
  );
}
