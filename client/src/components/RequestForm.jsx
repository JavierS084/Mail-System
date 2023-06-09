"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { useRouter, useParams } from "next/navigation";

import { useRequests } from "../context/RequestsContext";

function RequestsForm() {
  const { crRequest, upRequest, gtRequest } = useRequests();
  const params = useParams();
  const router = useRouter();

  const [request, setRequest] = useState({
    solicitud: "",
  });

  useEffect(() => {
    const loadRequests = async () => {
      if (params && params.id) {
        const request = await gtRequest(params.id);
        setRequest({
          solicitud: request.solicitud,
        });
      }
    };
    loadRequests();
  }, []);

  const clearInput = () => {
    setRequest([]);
  };

  return (
    <div className="card">
      <Formik
        initialValues={request}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};

          if (!values.solicitud) {
            errores.solicitud = "Por favor ingrese una solicitud";
          } else if (
            !/^.{2}[A-z Á-ź\D\s\s\s\s\s\s]+$/.test(values.solicitud)
          ) {
            errores.solicitud = "Por favor ingrese un solicitud Valida";
          }
          return errores;
        }}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await upRequest(params.id, values);
            toast.success(
              "La solicitud " +
                values.solicitud +
                " se ha actualizado correctamente"
            );
            router.push("/dependencies");
          } else {
            await crRequest(values);
            toast.success(
              "La solicitud " +
                values.solicitud +
                " se ha guardado correctamente"
            );
          }
          setRequest({
            solicitud: "",
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
            

                <h2>Crear una nueva solicitud</h2>
                <fieldset>
                  <label className="form-label mt-4" id="readOnlyInput">
                    Nueva solicitud
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Inserte aqui la nueva solicitud..."
                    data-listener-added_8ef6daa8="true"
                    name="solicitud"
                    onChange={handleChange}
                    value={values.solicitud}
                    onBlur={handleBlur}
                  />
                  {touched.solicitud && errors.solicitud && (
                    <span className="error pl-5">{errors.solicitud}</span>
                  )}
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

export default RequestsForm;
