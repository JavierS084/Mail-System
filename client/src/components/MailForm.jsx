"use client";
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import FormSelect from "react-bootstrap/Form";
import { useRouter, useParams } from "next/navigation";
import { useMails } from "@/context/MailsContext";
import { IconArrowLeft } from "@tabler/icons-react";

function MailForm() {
  const { mails, crMail, upMail, gtMail, msg } = useMails();
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [mail, setMail] = useState({
    user: "",
    solicitante: "Talento Humano",
    dateInicial: "",
    dateSolicitud: "",
    dateFinal: "",
    mailTypeId: "",
    requestId: "",
    departamentId: "",
    groupId: "",
  });
  useEffect(() => {
    const loadmail = async () => {
      if (params && params.uuid) {
        const mail = await gtMail(params.uuid);
        setMail({
          user: mail.user,
          solicitante: mail.solicitante,
          dateInicial: mail.dateInicial,
          dateFinal: mail.dateFinal,
          dateSolicitud: mail.dateSolicitud,
          mailTypeId: mail.mailTypeId,
          requestId: mail.requestId,
          departamentId: mail.departamentId,
          groupId: mail.groupId,
        });
      }
    };
    loadmail();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3030/requests")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const filteredData = data.filter((item) =>
    item.solicitud.toLowerCase().includes(query.toLowerCase())
  );

  const clearInput = () => {
    setMail([]);
  };

  return (
    <div className="card">
      <Formik
        initialValues={mail}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.user) {
            errores.user = "Por favor ingrese el Correo";
          } else if (
            !/^[.a-za-z0-9]+@(?:[a-za-z0-9]+\.)+[a-za-z]+$/.test(values.user)
          ) {
            errores.user = "Por favor ingrese un Correo valido";
          } else {
            mails.map((email) => (
              <span key={email.id}>
                {email.user === values.user
                  ? (errores.user =
                      "El correo ya está en uso, escriba uno diferente")
                  : ""}
              </span>
            ));
          }

          if (!values.dateSolicitud) {
            errores.dateSolicitud = "Por favor ingrese la Fecha de Solicitud";
          }
          if (!values.dateInicial) {
            errores.dateInicial = "Por favor ingrese la Fecha de Vinculacion";
          } else if (values.dateInicial < values.dateSolicitud) {
            errores.dateInicial =
              "La Fecha de Vinculacion no puede ser anterior a la Fecha de Solicitud";
          }
          if (!values.departamentId) {
            errores.departamentId = "Por favor ingrese la Dependencia";
          }
          if (!values.requestId) {
            errores.requestId = "Por favor ingrese el tipo de Solicitud";
          }
          if (!values.mailTypeId) {
            errores.mailTypeId = "Por favor ingrese el tipo de Correo";
          }
          if (values.dateFinal && values.dateFinal < values.dateInicial) {
            errores.dateFinal =
              "La Fecha de Desvinculacion no puede ser anterior a la Fecha de Vinculacion";
          }
          return errores;
        }}
        onSubmit={async (values, actions) => {
          if (params.uuid) {
            await upMail(params.uuid, values);
            toast.success(
              "El usuario " + values.name + " se ha actualizado correctamente"
            );
            router.push("/mail");
          } else {
            await crMail(values);
            toast.success(
              "El usuario " + values.name + " se ha guardado correctamente"
            );
          }
          setMail({
            user: "",
            solicitante: "",
            dateSolicitud: "",
            dateInicial: "",
            dateFinal: "",
            mailTypeId: "",
            requestId: "",
            departamentId: "",
            groupId: "",
          });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="form-group col-md-6 p-4">
                <div className="d-flex flex-row">
                  {params.uuid ? (
                    <div className="col-sm-1 flex-column d-flex">
                      <IconArrowLeft
                        className="mt-1"
                        type="button"
                        onClick={() => router.push(`/mails/`)}
                        color="grey"
                        size={28}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="col-md-8 flex-column  d-flex">
                    <h2>
                      {params.uuid
                        ? "Editar Usuario"
                        : "Crear un nuevo Usuario"}
                    </h2>
                  </div>
                </div>
                <p className="error pl-5">{msg}</p>

                <fieldset>
                  <div className="form-group">
                    <label className="form-label mt-4" id="readOnlyInput">
                      Usuario
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inserte aqui el usuario..."
                      data-listener-added_8ef6daa8="true"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.user && errors.user && (
                        <span className="error pl-5 mx-3 ">
                          <b>{errors.user}</b>
                        </span>
                      )}
                    </small>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label mt-4"
                    >
                      Tipo de correo
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Ingrese su correo"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    <small id="emailHelp" className="form-text text-danger">
                      {touched.email && errors.email && (
                        <span>
                          <b>{errors.email}</b>
                        </span>
                      )}
                    </small>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                    />
                    <small className="form-text text-danger">
                      {touched.password && errors.password && (
                        <span>{errors.password}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Tipo"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <select>
                      {filteredData.map((item) => (
                        <option key={item.id} value={item.solicitud}>
                          {item.solicitud}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
                <fieldset className="form-group">
                  <legend className="mt-4">Tipo de Usuario</legend>

                  <FormSelect.Select
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                  >
                    <option disabled value="">
                      Seleccione
                    </option>

                    <option value="user">Usuario estandar</option>
                    <option value="admin">Administrador</option>
                  </FormSelect.Select>
                </fieldset>

                <div className="mt-4">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={clearInput}
                  >
                    {isSubmitting ? "Guardando..." : "Guardar y Continuar"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MailForm;
