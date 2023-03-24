import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Updateuser() {
  const [user, setUser] = useState({});
  const [preuser, setPreuser] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const userdetails = JSON.parse(localStorage.getItem("user-info"));
  let uid = userdetails.data.userid;
  var token = userdetails.data.token;

  // const getUser = async () => {
  //   axios
  //     .get(`http://localhost:4000/user/${uid}`)
  //     .then(response => setPreuser(response.data[0]))
  //     .catch(error => console.log(error));
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  const handleInputChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const validate = values => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Phonenumber is required!";
    }
    if (!values.emailid) {
      errors.emailid = "Emailid is required!";
    } else if (!regex.test(values.emailid)) {
      errors.emailid = "This is not a valid email format!";
    }

    if (!values.gender) {
      errors.gender = "Gender is required!";
    }

    // if (!values.password) {
    //   errors.password = "Password is required";
    // } else if (values.password.length < 4) {
    //   errors.password = "Password must be more than 4 characters";
    // } else if (values.password.length > 10) {
    //   errors.password = "Password cannot exceed more than 10 characters";
    // }
    return errors;
  };
  const onSubmit = async data => {
    console.log(user);
    const validation = setFormErrors(validate(user));
    if (!validation) {
      const firstname = user.firstname;
      const lastname = user.lastname;
      const address = user.address;
      const phonenumber = user.phonenumber;
      const emailid = user.emailid;
      const gender = user.gender;
      const dateofbirth = user.dateofbirth;
      data.preventDefault();
      await axios
        .put(
          `http://localhost:4000/user/${uid}`,
          {
            firstname: firstname,
            lastname: lastname,
            address: address,
            phonenumber: phonenumber,
            emailid: emailid,
            gender: gender,
            dateofbirth: dateofbirth,
          },
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(result => {
          console.log("response", result);
        })
        .catch(err => {
          console.log("errors", err);
        });
    }
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
              onSubmit={onSubmit}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Update User</h2>
              </div>

              <div className="form-group">
                <label className="lbel">First Name</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter First Name"
                  name="firstname"
                  id="firstname"
                  onChange={handleInputChange}
                />
                <p>{formErrors.firstname}</p>
              </div>
              <div className="form-group">
                <label className="lbel">Last Name</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  id="lastname"
                  onChange={handleInputChange}
                />
                <p>{formErrors.lastname}</p>
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
                  onChange={handleInputChange}
                />
                <p>{formErrors.address}</p>
              </div>
              <div className="form-group">
                <label className="lbel">Phone number</label>
                <input
                  className="form-control p-0"
                  type="number"
                  placeholder="phonenumber"
                  name="phonenumber"
                  id="phonenumber"
                  onChange={handleInputChange}
                />
                <p>{formErrors.phonenumber}</p>
              </div>

              <div className="form-group">
                <label className="lbel">Emailid</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter emailid"
                  name="emailid"
                  id="emailid"
                  onChange={handleInputChange}
                />
                <p>{formErrors.emailid}</p>
              </div>

              <div className="form-group">
                <label>gender</label>
                <input
                  type="radio"
                  value="male"
                  id="gender"
                  name="gender"
                  onChange={handleInputChange}
                />
                male
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  value="female"
                  id="gender"
                  name="gender"
                  onChange={handleInputChange}
                />
                female
              </div>
              <p>{formErrors.gender}</p>

              <div className="form-group">
                <label className="lbel">Date Of Birth</label>
                <input
                  className="form-control p-0"
                  type="date"
                  placeholder="Date Of Birth"
                  name="dateofbirth"
                  id="dateofbirth"
                  onChange={handleInputChange}
                />
                <p>{formErrors.dateofbirth}</p>
              </div>
              <div className="form-group mb-3">
                <button className="btn btn-primary form-control" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateuser;
