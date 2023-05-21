import Users from "@/components/Users";

async function fetchDataUser() {
  const response = await fetch("http://localhost:3030/users");
  const data = await response.json();

  return data;
}

export default async function UsersPage() {
  const users = await fetchDataUser();

  return (
    <div>
      <h1>Lista de Usuarios</h1>

      <Users users={users} />
    </div>
  );
}


