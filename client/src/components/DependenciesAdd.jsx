"use client"
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useDependencies } from "../context/DependenciesContext";

function DependenciesAdd() {
  const { crDp, msg } = useDependencies();

  const [dependency, setDependency] = useState({
    dependencia: "",
  });
  const clearInput = () => {
    setDependency([]);
  };

  return (
    <Formik
      initialValues={dependency}
      enableReinitialize={true}
      validate={(values) => {
        let errores = {};

        if (!values.dependencia) {
          errores.dependencia = "Por favor ingrese una dependencia";
        } else if (!/^.{2}[A-z Á-ź\D\s\s\s\s\s\s]+$/.test(values.dependencia)) {
          errores.dependencia = "Por favor ingrese un Dependencia Valida";
        }
        return errores;
      }}
      onSubmit={async (values, actions) => {
        await crDp(values);
        setDependency({
          dependencia: "",
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
              <p className="error pl-5">{msg}</p>
              {isSubmitting && (
                <div className="alert alert-dismissible alert-success">
                  <strong>La Dependencia se guardo con exito!</strong>
                </div>
              )}
              <h2>Crear una Nueva Dependencia</h2>
              <fieldset>
                <label className="form-label mt-4" for="readOnlyInput">
                  Nueva dependencia
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Inserte aqui la nueva dependencia..."
                  data-listener-added_8ef6daa8="true"
                  name="dependencia"
                  onChange={handleChange}
                  value={values.dependencia}
                  onBlur={handleBlur}
                />
                {touched.dependencia && errors.dependencia && (
                  <span className="error pl-5">{errors.dependencia}</span>
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
  );
}

export default DependenciesAdd;
