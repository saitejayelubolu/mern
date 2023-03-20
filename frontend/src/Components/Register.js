import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
function Register() {
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
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <form
              method="post"
              name="userRegistrationForm"
              className="flex-c form-width justify-content-md-center logform"
              onSubmit={handleSubmit()}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Register </h2>
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

              <div className="form-group">
                <label className="lbel">First Name</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter First Name"
                  name="firstname"
                  id="firstname"
                  {...register("firstname", {
                    required: "firstname is required",
                  })}
                  onKeyUp={() => {
                    trigger("firstname");
                  }}
                />
                {errors.firstname && (
                  <small className="text-danger">
                    {errors.firstname.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="lbel">Last Name</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  id="lastname"
                  {...register("lastname", {
                    required: "lastname is required",
                  })}
                  onKeyUp={() => {
                    trigger("lastname");
                  }}
                />
                {errors.lastname && (
                  <small className="text-danger">
                    {errors.lastname.message}
                  </small>
                )}
              </div>

              {/* break */}

              <div className="form-group">
                <label className="lbel">Address</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  id="address"
                  {...register("address", {
                    required: "address is required",
                  })}
                  onKeyUp={() => {
                    trigger("address");
                  }}
                />
                {errors.address && (
                  <small className="text-danger">
                    {errors.address.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="lbel">Phone number</label>
                <input
                  className="form-control p-0"
                  type="number"
                  placeholder="phonenumber"
                  name="phonenumber"
                  id="phonenumber"
                  {...register("phonenumber", {
                    required: "phonenumber is required",
                  })}
                  onKeyUp={() => {
                    trigger("phonenumber");
                  }}
                />
                {errors.phonenumber && (
                  <small className="text-danger">
                    {errors.phonenumber.message}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="lbel">Emailid</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter emailid"
                  name="emailid"
                  id="emailid"
                  {...register("emailid", {
                    required: "emailid is required",
                  })}
                  onKeyUp={() => {
                    trigger("emailid");
                  }}
                />
                {errors.emailid && (
                  <small className="text-danger">
                    {errors.emailid.message}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="lbel">gender</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="gender"
                  name="gender"
                  id="gender"
                  {...register("gender", {
                    required: "gender is required",
                  })}
                  onKeyUp={() => {
                    trigger("gender");
                  }}
                />
                {errors.gender && (
                  <small className="text-danger">{errors.gender.message}</small>
                )}
              </div>

              <div className="form-group">
                <label className="lbel">Date Of Birth</label>
                <input
                  className="form-control p-0"
                  type="date"
                  placeholder="Date Of Birth"
                  name="dateofbirth"
                  id="dateofbirth"
                  {...register("dateofbirth", {
                    required: "dateofbirth is required",
                  })}
                  onKeyUp={() => {
                    trigger("dateofbirth");
                  }}
                />
                {errors.dateofbirth && (
                  <small className="text-danger">
                    {errors.dateofbirth.message}
                  </small>
                )}
              </div>
              <div className="form-group mb-3">
                <button className="btn btn-primary form-control" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
