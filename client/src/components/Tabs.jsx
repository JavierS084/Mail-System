import React, { useState, useEffect } from "react";
import DependenciesCard from "@/components/DependenciesCard";
//import { useDependencies } from "@/context/DependenciesContext";
function Tabs({dependencies}) {
  const [activeTab, setActiveTab] = useState(1);
  //const { dependencies, loadDependencies } = useDependencies();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
 useEffect(() => {
   //loadDependencies();

 },[activeTab]);



  return (
    <div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="Lista">
          <a
             isActive={activeTab === 1}
             onClick={() => handleTabChange(1)}
             class="nav-link active"
             data-bs-toggle="tab"
             aria-selected="true"
             role="tab"
             id="ListaTab"
          >
            Lista de Dependencias
          </a>
        </li>
        <li class="nav-item" role="crear">
          <a
            isActive={activeTab === 2}
            onClick={() => handleTabChange(2)}
            class="nav-link"
            data-bs-toggle="tab"
            aria-selected="false"
            role="tab"
            id="crearTab"
          >
            Crear Dependecia
          </a>
        </li>
      </ul>
      <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade active show" id="ListaTab" role="Lista">
          {activeTab === 1 && <DependenciesCard  dependencies={dependencies} />}
        </div>
        <div class="tab-pane fade active show" id="crearTab" role="crear">
          {activeTab === 2 && <>Contenido del Tab 2</>}
        </div>
      </div>
    </div>
  );
}

export default Tabs;
