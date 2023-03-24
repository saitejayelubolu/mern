import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm({});

  let navigate = useNavigate();
  const routeRegister = () => {
    let path = `signup`;
    navigate(path);
  };

  const routeLogin = () => {
    let path = `login`;
    navigate(path);
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="card">
            <div className="form-group m-5">
              <button
                className="btn btn-primary m-5"
                onClick={routeRegister}
                type="button"
              >
                Signup
              </button>
              <button
                className="btn btn-primary m-5"
                onClick={routeLogin}
                type="button"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;