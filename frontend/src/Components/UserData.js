import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import "../App.css";
function UserData({ id }) {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    axios
      .get("http://localhost:4000/user/1")
      .then(response => setUser(response.data))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(user[0].name);
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserData;
