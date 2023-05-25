"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDependencies } from "@/context/DependenciesContext";

export default function DependenciesCard({ dependencies }) {
  const { dependencies: dependencia, setDependencies } = useDependencies();
  const [accion, setAccion] = useState(false);
  const [select, setSelect] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const router = useRouter();

  useEffect(() => {
    if (select.length === 0) {
      setAccion(false);
    }
    //pasando los 10 segundos se deshabilita el boton eliminar
    const timer = setTimeout(() => {
      setAccion(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [select]); //se refrezca por cada actualizacion

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelect([...select, value]);
      setAccion(checked);
    } else {
      //pasa todos los datos menos los selecionados
      setSelect(select.filter((o) => o !== value));
    }
  };

  function Orden(columna) {
    const datosOrdenados = [...dependencia];

    datosOrdenados.sort((datoA, datoB) => {
      if (datoA[columna] < datoB[columna]) {
        return ordenAscendente ? -1 : 1;
      }
      if (datoA[columna] > datoB[columna]) {
        return ordenAscendente ? 1 : -1;
      }
      return 0;
    });

    setDependencies(datosOrdenados);
    setOrdenAscendente(!ordenAscendente);
  }

  return (
    <>
      <h1>Lista de Dependencias</h1>
      <button
        onClick={handleShow}
        disabled={!accion}
        type="button"
        className="btn btn-danger"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        data-bs-original-title="Tooltip on left"
      >
        Eliminar
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Accion</th>
            <th scope="col" >
              ID
            </th>
            <th scope="col" onClick={() => Orden('id')}>Dependencia</th>
            <th scope="col">Fecha de Creacion</th>
          </tr>
        </thead>

        <tbody>
          {dependencies.map((dependency) => (
            <tr scope="row" key={dependency.id}>
              <td>
                <input
                  onChange={handleChange}
                  className="form-check-input"
                  type="checkbox"
                  value={dependency.id}
                  id="flexCheckDefault"
                />
              </td>

              <td>{dependency.id}</td>
              <td>{dependency.departamento}</td>
              <td>{dependency.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Realmente deseas eliminar? Este proceso no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button>Entendido</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
