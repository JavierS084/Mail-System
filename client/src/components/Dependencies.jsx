"use client";
import { useRouter } from "next/navigation";

export default async function Dependencies({ datos }) {
  const router = useRouter();
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Dependencia</th>
          <th scope="col">Fecha de Creacion</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          <tr
            scope="row"
            key={item.id}
            onClick={() => {
              router.push(`/dependencies/${item.id}`);
            }}
          >
            <td>{item.id}</td>
            <td>{item.departamento}</td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
