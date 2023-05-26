"use client";
import { useEffect } from "react";
import Tabs from "@/components/Tabs";
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
    return <Tabs dependencies={dependencies} />;
  }

  return renderMain();
}
