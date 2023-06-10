"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IconHomeCog, IconUserCircle } from '@tabler/icons-react';

export default function Navigation() {
  const options = [
    {
      name: "end",
      scroll: true,
      backdrop: true,
    },
  ];

  function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (
      <>
        <Button variant="primary" onClick={toggleShow} className="me-2">
          <IconHomeCog color="white" size={24 }  />
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
          <IconUserCircle  color="blue" size={24 }/>  
            <Offcanvas.Title> Perfil</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo facilis maxime reprehenderit maiores! Rem aspernatur reprehenderit velit eos hic! Voluptates earum ad fuga quaerat! Incidunt eius nisi quos recusandae sequi.
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  function Example() {
    return (
      <>
        {["end"].map((placement, idx) => (
          <OffCanvasExample key={idx} placement={placement} name={placement} />
        ))}
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Mail System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/mails">
                Correos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dependencies">
                Dependencias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/administration">
                Administracion
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Aextra
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" href="#">
                  Action
                </Link>
                <Link className="dropdown-item" href="#">
                  Another action
                </Link>
                <Link className="dropdown-item" href="#">
                  Something else here
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" href="#">
                  Separated link
                </Link>
              </div>
            </li>
          </ul>
          <form className="d-flex">
            
              <Example />
            
          </form>
        </div>
      </div>
    </nav>
  );
}
