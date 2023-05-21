async function getUser(uuid) {
  const response = await fetch(`http://localhost:3030/user/${uuid}`); //Realiza un render desde el servidor
  const data = await response.json();
  return data;
}
export default async function UserPageid({ params }) {
  const user = await getUser(params.uuid);

  return (
    <article>
      <h2>{user.name}</h2>
      <div>
      <label htmlFor="">Correo </label>
      <p>{user.email}</p>
      </div>
      <div>
        <label>Rol de Usuario</label>
        <p>{user.role}</p>
      </div>
    </article>
  );
}
