"use client";
import { useEffect } from "react";
import DependenciesCard from "@/components/DependenciesCard";
import { useDependencies } from "@/context/DependenciesContext";

export default function DependenciasPage() {
  const { dependencies, loadDependencies } = useDependencies();

  useEffect(() => {
    loadDependencies();
  }, []);

  // console.log(dependencies);
  function renderMain() {
    if (dependencies.length === 0)
      return (
        <div>
          <h1>No existen Dependencias Disponibles</h1>
        </div>
      );
    return <DependenciesCard  dependencies={dependencies} />
    
  }

  return renderMain();
}
