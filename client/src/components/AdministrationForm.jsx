"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { useRouter, useParams } from "next/navigation";
import { useAdministration } from "@/context";

function AdministrationForm() {
  const { crUser, upUser, gtUser, msg } = useAdministration();
  const params = useParams();
  const router = useRouter();
  const [administration, setAdministration] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    confpassword: "",
  });
  useEffect(() => {
    const loadAdministration = async () => {
      if (params && params.uuid) {
        const Administration = await gtUser(params.uuid);
        setAdministration({
          name: Administration.name,
          role: Administration.role,
          email: Administration.email,
          password: Administration.password,
          confpassword: Administration.confpassword,
        });
      }
    };
    loadAdministration();
  }, []);

  const clearInput = () => {
    setAdministration([]);
  };

  return (
    <div className="card">
      <Formik
        initialValues={administration}
        enableReinitialize={true}
        validate={(values) => {
          let errores = {};
          console.log(values.role);
          if (!values.name) {
            errores.name = "Por favor ingrese el nombre completo";
          } else if (!/^.{2}[A-z Á-ź\D\s\s\s\s\s\s]+$/.test(values.name)) {
            errores.name = "Por favor ingrese un Nombre Valido";
          }
          return errores;
        }}
        onSubmit={async (values, actions) => {
          if (params.uuid) {
            await upUser(params.uuid, values);
            toast.success(
              "El usuario " + values.name + " se ha actualizado correctamente"
            );
            router.push("/administration");
          } else {
            await crUser(values);
            toast.success(
              "El usuario " + values.name + " se ha guardado correctamente"
            );
          }
          setAdministration({
            name: "",
            role: "",
            email: "",
            password: "",
            confpassword: "",
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

                <h2>Crear un nuevo Usuario</h2>
                <fieldset>
                  <div className="form-group">
                    <label className="form-label mt-4" id="readOnlyInput">
                      Nuevo Usuario
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inserte aqui el nombre..."
                      data-listener-added_8ef6daa8="true"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <span className="error pl-5">{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="form-label mt-4">
                      Dirección de correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label
                      for="exampleInputPassword1"
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
                  </div>
                  <div className="form-group">
                    <label
                      for="exampleInputPassword2"
                      className="form-label mt-4"
                    >
                      Confirmacion de Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Password"
                      name="confpassword"
                      onChange={handleChange}
                      value={values.confpassword}
                      onBlur={handleBlur}
                    />
                  </div>
                </fieldset>
                <fieldset className="form-group">
                  <legend className="mt-4">Tipo de Usuario</legend>
                  <div className="form-check" value={values.role}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="optionsRadios"
                      id="optionsRadios1"
                      value="user"
                      data-listener-added_f151fcb5="true"
                    />
                    <label className="form-check-label" for="optionsRadios1">
                      Usuario Estandar, acceso limitado
                    </label>
                  </div>
                  <div className="form-check" value={values.role}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="optionsRadios"
                      id="optionsRadios2"
                      value="admin"
                      data-listener-added_f151fcb5="true"
                    />
                    <label className="form-check-label" for="optionsRadios2">
                      Usuario Administrador, acceso ilimitado al control de
                      usuarios
                    </label>
                  </div>
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

export default AdministrationForm;
