async function getDependencia(id) {
  const response = await fetch(`http://localhost:3030/dependency/${id}`);
  const data = await response.json();
  return data;
}

export default async function dependenciesid({ params }) {
  const dependencia = await getDependencia(params.id);
  return <div>{JSON.stringify(dependencia)}</div>;
}
