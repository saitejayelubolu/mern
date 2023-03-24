import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UserData() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("user-info"));
  const token = userdetails.data.token;
  let uid = userdetails.data.userid;
  console.log(token);

  const getUser = async () => {
    axios
      .get(`http://localhost:4000/user/${uid}`)
      .then(response => setUser(response.data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  const routeUpdate = () => {
    navigate("/update");
  };
  // console.log(user[0].name);
  return (
    <div>
      <div>
        {user.map(user => (
          <div>
            <span>{user.name}</span>
            <br></br>
            <span>{user.Address}</span>
            <br></br>
            <span>{user.phonenumber}</span>
            <br></br>
            <span>{user.emailid}</span>
            <br></br>
            <span>{user.gender}</span>
            <br></br>
            <span>{user.dateofbirth}</span>
            <button type="button" onClick={routeUpdate}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserData;
