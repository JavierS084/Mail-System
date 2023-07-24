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
  const [user, setUser] = useState("");
  const [dateSolicitud, setDateSolicitud] = useState();
  const [dateInicial, setDateInicial] = useState();
  const [dateFinal, setDateFinal] = useState();

  const [typeRequestList, setTypeRequestsList] = useState([]);
  const [requestOption, setRequestOption] = useState({ requestId: "" });

  const [mailTypesList, setTypeList] = useState([]);
  const [typeOption, setTypeOption] = useState({ mailTypeId: "" });

  const [groupList, setGroupList] = useState([]);
  const [groupOption, setGroupOption] = useState({ groupId: "" });

  const [dependenciesList, setDependenciesList] = useState([]);
  const [dependenciesOption, setDependenciesOption] = useState({
    dependencyId: "",
  });

  const params = useParams();
  const router = useRouter();

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

  const updateProps = () => {
    setMail({
      ...mail,
      mailTypeId: typeOption.mailTypeId,
      groupId: groupOption.groupId,
      dependencyId: dependenciesOption.dependencyId,
      requestId: requestOption.requestId,
      user: user,
      dateFinal: dateFinal,
      dateSolicitud: dateSolicitud,
      dateInicial: dateInicial,
    });
  };


  useEffect(() => {
    const loadmail = async () => {
      if (params && params.id) {
        const mail = await gtMail(params.id);

        setUser(mail.user);
        setDateInicial(mail.dateInicial);
        setDateFinal(mail.dateFinal);
        setDateSolicitud(mail.dateSolicitud);
        const mailType = mailTypes.find(type => type.id === mail.mailTypeId);
        setTypeOption({ mailTypeId: mail.mailTypeId, label: mailType.tipo });
    
        /*  
        setMail({
         
          solicitante: mail.solicitante,
          requestId: mail.requestId,
          dependencyId: mail.dependencyId,
          groupId: mail.groupId,
        });*/
      }
    };
    loadmail();
  }, []);
  //efecto para la actualizacion y obtencion de datos para el select de los distintos componentes
  useEffect(() => {
    const timer = setTimeout(() => {
      const requestOptionList = requests.map((typeSolicitud) => ({
        requestId: typeSolicitud.id,
        label: typeSolicitud.solicitud,
      }));
      setTypeRequestsList(requestOptionList);

      const mailTypeOptionsList = mailTypes.map((type) => ({
        mailTypeId: type.id,
        label: type.tipo,
      }));
      setTypeList(mailTypeOptionsList);

      const groupOptionsList = groups.map((grupo) => ({
        groupId: grupo.id,
        label: grupo.description,
      }));
      setGroupList(groupOptionsList);

      const dependenciesOptionsList = dependencies.map((dependency) => ({
        dependencyId: dependency.id,
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

  useEffect(() => {
    updateProps();
   
  }, [
    typeOption,
    groupOption,
    requestOption,
    dependenciesOption,
    user,
    dateFinal,
    dateInicial,
    dateSolicitud,
  ]);

  const clearInput = () => {
    setMail([]);
    setDateFinal();
    setGroupOption([]);
    setDateInicial();
    setDateSolicitud();
    setUser("");
    setRequestOption([]);
    setTypeOption([]);
    setDependenciesOption([]);
  };
  /*
  function handleSubmit(event) {
    event.preventDefault();
    if (!typeOption.mailTypeId) {
      alert("Por favor seleccione una opción de Tipo de Correo");
    } else if (!requestOption.requestId) {
      alert("Por favor seleccione una opción de Tipo de Solicitud");
    } else if (!dependenciesOption.dependencyId) {
      alert("Por favor seleccione una opción de las Dependencias");
    }

    // Aquí puedes enviar el formulario
  }

  function handleBlur(event) {
    const value = event.target.value;
    console.log(value)
    if (!typeRequestList.some((option) => option.requestId === value.requestId)) {
      alert('Por favor seleccione una opción válida');
    }
  }*/

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
          } else if (
            values.dateInicial &&
            values.dateInicial > values.dateFinal
          ) {
            errores.dateInicial =
              "La Fecha de Vinculacion no Puede ser Superior a la Fecha de Desvinculacion";
          }

          if (values.dateFinal && values.dateFinal < values.dateInicial) {
            errores.dateFinal =
              "La Fecha de Desvinculacion no puede ser anterior a la Fecha de Vinculacion";
          }
          return errores;
        }}
        onSubmit={async (values, actions) => {
          if (params.uuid) {
            upMail(values, params.id)
            toast.success(
              "El usuario " + values.user + " se ha actualizado correctamente"
            );
            await upMail(params.id, values);
          } else {
            await crMail(values);

            toast.success(
              "El usuario " + values.user + " se ha guardado correctamente"
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
          isSubmitting,
          errors,
          touched,
          handleSubmit,
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
                      Correo de usuario <span className="obligatorio">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Inserte aqui el usuario..."
                      name="user"
                      onChange={(option) => {
                        setUser(option.target.value);
                        handleChange;
                      }}
                      value={user}
                      onBlur={handleBlur}
                      required
                    />
                    <small className="form-text text-danger">
                      {touched.user && errors.user && (
                        <span>{errors.user}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label mt-4"
                    >
                      Tipo de correo <span className="obligatorio">*</span>
                    </label>
                    <Select
                      name="mailTypeId"
                      options={mailTypesList}
                      onChange={(option) => {
                        setTypeOption({
                          ...typeOption,
                          mailTypeId: option.mailTypeId,
                        });
                        handleChange;
                      }}
                      placeholder="Seleccione una opción..."
                      isSearchable
                      required
                    />
                    <small className="form-text text-danger">
                      {touched.typeOption && errors.typeOption && (
                        <span>{errors.typeOption}</span>
                      )}
                    </small>
                  </div>

                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Tipo de Solicitud <span className="obligatorio">*</span>
                    </label>
                    <Select
                      name="requestId"
                      options={typeRequestList}
                      onBlur={handleBlur}
                      onChange={(option) => {
                        setRequestOption({
                          ...requestOption,
                          requestId: option.requestId,
                        });
                        handleChange;
                      }}
                      placeholder="Seleccione una opción..."
                      isSearchable
                      required
                    />
                    <small className="form-text text-danger">
                      {touched.requestOption && errors.requestOption && (
                        <span>{errors.requestOption}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label mt-4"
                    >
                      Dependencia Perteneciente
                      <span className="obligatorio">*</span>
                    </label>
                    <Select
                      name="dependecyId"
                      options={dependenciesList}
                      onBlur={handleBlur}
                      onChange={(option) =>
                        setDependenciesOption({
                          ...dependenciesOption,
                          dependencyId: option.dependencyId,
                        })
                      }
                      placeholder="Seleccione una opción..."
                      isSearchable
                      required
                    />
                    {touched.dependenciesOption &&
                      errors.dependenciesOption && (
                        <span>{errors.dependenciesOption}</span>
                      )}
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
                      onBlur={handleBlur}
                      onChange={(option) =>
                        setGroupOption({
                          ...groupOption,
                          groupId: option.groupId,
                        })
                      }
                      placeholder="Seleccione una opción..."
                      isSearchable
                    />
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Solicitud <span className="obligatorio">*</span>
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateSolicitud"
                        onChange={handleChange}
                        value={dateSolicitud}
                        required
                      />
                    </label>
                    <small className="form-text text-danger">
                      {touched.dateSolicitud && errors.dateSolicitud && (
                        <span>{errors.dateSolicitud}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Vinculacion
                      <span className="obligatorio">*</span>
                      <input
                        className="form-control"
                        type="date"
                        onBlur={handleBlur}
                        name="dateInicial"
                        onChange={handleChange}
                        value={dateInicial}
                        required
                      />
                    </label>
                    <small className="form-text text-danger">
                      {touched.dateInicial && errors.dateInicial && (
                        <span>{errors.dateInicial}</span>
                      )}
                    </small>
                  </div>
                  <div className="form-group col-md-6 flex-column d-flex">
                    <label className="form-label mt-4">
                      Fecha de Desvinculacion
                      <input
                        className="form-control"
                        type="date"
                        name="dateFinal"
                        onChange={handleChange}
                        value={dateFinal}
                        onBlur={handleBlur}
                      />
                    </label>
                    <small className="form-text text-danger">
                      {touched.dateFinal && errors.dateFinal && (
                        <span>{errors.dateFinal}</span>
                      )}
                    </small>
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
