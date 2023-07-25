"use client"
import React, { useState, useSelector, useDispatch, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginUser, reset, getMe } from "../../auth/authSlice";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [shown, setShown] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const switchShown = () => {
    setShown(!shown);
  };

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      router.push("/");
    }
    dispatch(getMe());
    dispatch(reset());
  }, [user, isSuccess, dispatch, router]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  return (
    <div className="row">
      <form onSubmit={Auth}>
        <div className="login col-md-3 mx-auto ">
          <h3 className="Auth-form-title">Inicio Sesi&oacute;n</h3>

          <div className="form-group flex-column d-flex">
            {isError && <p className="error">{message}</p>}
            <label className="label">Email</label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group flex-column d-flex">
            <label className="label">Password</label>
            <input
              type={shown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
            />

              {shown ? (
                <i className="col align-self-end fas fa-eye" onClick={switchShown} />
              ) : (
                <i className="col align-self-end fas fa-eye-slash fas-eye" onClick={switchShown} />
              )
              }
            
            
          </div>
          <div className="form-group flex-column d-flex">
            <button type="submit" className="btn btn-primary">
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
