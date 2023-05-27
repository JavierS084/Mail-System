"use client";
import { useState, useEffect } from "react";
import DependenciesCard from "@/components/DependenciesCard";
import DependenciesAdd from "@/components/DependenciesAdd";
import { useDependencies } from "@/context/DependenciesContext";

export default function DependenciasPage() {
  const { dependencies, loadDependencies, delDp } = useDependencies();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDependencies();
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTab, dependencies]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

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

  return (
    <div>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            aria-selected="true"
            role="tab"
            isActive={activeTab === 1}
            onClick={() => handleTabChange(1)}
          >
            Lista de Dependencias
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            aria-selected="false"
            isActive={activeTab === 2}
            tabindex="-1"
            role="tab"
            onClick={() => handleTabChange(2)}
          >
            Crear Dependecia
          </button>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content">
        <div
          className="tab-pane fade active show"
          id="listadependencias"
          role="tabpanel"
        >
          <article>{activeTab === 1 && renderlista()}</article>
        </div>
        <div
          className="tab-pane fade active show"
          id="createdependencies"
          role="tabpanel"
        >
          {activeTab === 2 && <DependenciesAdd />}
        </div>
      </div>
    </div>
  );
}
