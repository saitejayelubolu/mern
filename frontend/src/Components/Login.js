import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/user");
    }
  }, []);
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

  const onSubmit = async data => {
    // data.preventDefault();
    const username = data.username;
    const password = data.password;

    await axios
      .post(
        "http://localhost:4000/login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(result => {
        console.log("res", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/user");
      })
      .catch(err => {
        console.log("errors", err);
      });
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <form
              method="post"
              name="userRegistrationForm"
              className="flex-c form-width justify-content-md-center logform"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Login </h2>
              </div>
              <div className="form-group">
                <label className="lbel">Username</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  onKeyUp={() => {
                    trigger("username");
                  }}
                />
                {errors.username && (
                  <small className="text-danger">
                    {errors.username.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="lbel">Password</label>
                <input
                  className="form-control p-0"
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-3">
                <button className="btn btn-primary form-control" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
