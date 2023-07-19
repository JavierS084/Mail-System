"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Select from "react-select";
import { useRouter, useParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMails } from "@/context/MailsContext";
import { useRequests } from "@/context/RequestsContext";
import { useMailTypes } from "@/context/MailTypeContext";
import { useGroups } from "@/context/GroupsContext";
import { useDependencies } from "@/context/DependenciesContext";

function MailForm() {
  const { mails, crMail, upMail, gtMail, msg } = useMails();

  const { requests, loadRequests } = useRequests();
  const { mailTypes, loadTypes } = useMailTypes();
  const { groups, loadGroups } = useGroups();
  const { dependencies, loadDependencies } = useDependencies();
  //section Options de Select search
  const [typeRequestList, setTypeRequestsList] = useState([]);
  const [requestOption, setRequestOption] = useState();

  const [mailTypesList, setTypeList] = useState([]);
  const [typeOption, setTypeOption] = useState();

  const [groupList, setGroupList] = useState([]);
  const [groupOption, setGroupOption] = useState();

  const [dependenciesList, setDependenciesList] = useState([]);
  const [dependenciesOption, setDependenciesOption] = useState();

  const params = useParams();
  const router = useRouter();

  console.log(groupOption);
  const [mail, setMail] = useState({
    user: "",
    solicitante: "Talento Humano",
    dateInicial: "",
    dateFinal: "",
    dateSolicitud: "",
    mailTypeId: "",
    groupId: "",
    dependencyId: "",
    requestId: "",
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
          dependencyId: mail.dependencyId,
          groupId: mail.groupId,
        });
      }
    };
    loadmail();
  }, []);
  //efecto para la actualizacion y obtencion de datos para el select de los distintos componentes
  useEffect(() => {
    const timer = setTimeout(() => {
      const requestOptionList = requests.map((typeSolicitud) => ({
        value: typeSolicitud.id,
        label: typeSolicitud.solicitud,
      }));
      setTypeRequestsList(requestOptionList);

      const mailTypeOptionsList = mailTypes.map((type) => ({
        value: type.id,
        label: type.tipo,
      }));
      setTypeList(mailTypeOptionsList);

      const groupOptionsList = groups.map((grupo) => ({
        value: grupo.id,
        label: grupo.description,
      }));
      setGroupList(groupOptionsList);

      const dependenciesOptionsList = dependencies.map((dependency) => ({
        value: dependency.id,
        label: dependency.dependencia,
      }));
      setDependenciesList(dependenciesOptionsList);
    }, 100);

    loadDependencies();
    loadRequests();
    loadTypes();
    loadGroups();

    return () => clearTimeout(timer);
  }, [requests.length, groups.length, mailTypes.length, dependencies.length]);

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
          /*

          if (!values.dateSolicitud) {
            errores.dateSolicitud = "Por favor ingrese la Fecha de Solicitud";
          }
          if (!values.dateInicial) {
            errores.dateInicial = "Por favor ingrese la Fecha de Vinculacion";
          } else if (values.dateInicial < values.dateSolicitud) {
            errores.dateInicial =
              "La Fecha de Vinculacion no puede ser anterior a la Fecha de Solicitud";
          }
          if (!values.dependencyId) {
            errores.dependencyId = "Por favor ingrese la Dependencia";
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
          }*/
          return errores;
        }}
        onSubmit={async (values, actions) => {
          if (params.uuid) {
            await upMail(params.uuid, values);
            toast.success(
              "El usuario " + values.name + " se ha actualizado correctamente"
            );
            router.push("/mails");
          } else {
            await crMail(values, typeOption, requestOption);
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
            dependencyId: "",
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
            <div className="justify-content-center">
              <div className="form-group p-4">
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
                        : "Registrar un nuevo correo"}
                    </h2>
                  </div>
                </div>
                <p className="error pl-5">{msg}</p>

                <fieldset className="row">
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4" id="readOnlyInput">
                      Correo de usuario
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Inserte aqui el usuario..."
                      name="user"
                      onChange={handleChange}
                      value={values.user}
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
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label mt-4"
                    >
                      Tipo de correo
                    </label>
                    <Select
                      id="mailTypeId"
                      options={mailTypesList}
                      value={typeOption}
                      onChange={setTypeOption}
                      placeholder="Seleccione una opción..."
                      isSearchable
                    />
                  </div>

                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Tipo de Solicitud
                    </label>
                    <Select
                      name="requestId"
                      options={typeRequestList}
                      value={requestOption}
                      onChange={setRequestOption}
                      placeholder="Seleccione una opción..."
                      isSearchable
                    />
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Dependencia Perteneciente
                    </label>
                    <Select
                      name="dependecyId"
                      options={dependenciesList}
                      value={dependenciesOption}
                      onChange={setDependenciesOption}
                      placeholder="Seleccione una opción..."
                      isSearchable
                    />
                  </div>

                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Grupo
                    </label>
                    <Select
                      name="groupId"
                      options={groupList}
                      value={groupOption}
                      onChange={setGroupOption}
                      placeholder="Seleccione una opción..."
                      isSearchable
                    />
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Solicitud
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateSolicitud"
                        onChange={handleChange}
                        value={values.dateSolicitud}
                      />
                    </label>
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Vinculacion
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateInicial"
                        onChange={handleChange}
                        value={values.dateInicial}
                      />
                    </label>
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Desvinculacion
                      <input
                        className="form-control"
                        type="date"
                        name="dateFinal"
                        onChange={handleChange}
                        value={values.dateFinal}
                      />
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

export default MailForm;
