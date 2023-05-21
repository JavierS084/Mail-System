import Dependencies from "@/components/Dependencies";
async function fetchData() {
  const response = await fetch("http://localhost:3030/departaments");
  const data = await response.json();
  return data;
}

export default async function DependenciasPage() {
  const datos = await fetchData();
  return (
    <div>
      <h1>Lista de Dependencias</h1>

      <Dependencies datos={datos} />
    </div>
  );
}
