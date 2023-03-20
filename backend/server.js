const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "userdb",
});

connection.connect((err, connection) => {
  if (err) {
    console.log("Database connection error", err);
  } else {
    console.log("Database connection success");
  }
});

app.get("/", (req, res) => {
  res.send("get success");
});

//Register
app.post("/register", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const name = firstName + " " + lastName;
  console.log("name:", name);
  // const name = req.body.name;
  const address = req.body.address;
  const phoneNumber = req.body.phonenumber;
  const emailid = req.body.emailid;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateofbirth; // Format = "1990-01-01"
  const username = req.body.username;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  connection.execute(
    `select username from users where username =?`,
    [username],
    (err, usernameObj) => {
      if (err) {
        res.send(err);
      } else if (usernameObj[0]) {
        res.send("this username is already registered");
      } else {
        if (newPassword != confirmPassword) {
          res.send("Password is not matched");
        } else {
          const password = newPassword;
          // Calculate the age
          const birthDate = new Date(dateOfBirth);
          const ageDiffMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDiffMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          // Print the age
          // console.log(age);
          if (!dateOfBirth) {
            res.send("Date of birth is required");
          } else if (age <= 18) {
            res.send("Age must be graterthan 18 years");
          } else {
            connection.execute(
              `INSERT INTO users ( username, password, name, address, phonenumber, emailid, gender, dateofbirth) VALUES (?,?,?,?,?,?,?,?)`,
              [
                username,
                password,
                name,
                address,
                phoneNumber,
                emailid,
                gender,
                dateOfBirth,
              ],
              (err, result) => {
                if (err) {
                  res.send({ status: false, message: err });
                } else {
                  res.send({ status: true, message: result });
                }
              }
            );
          }
        }
      }
    }
  );
});

//Login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.execute(
    `select username, password from users where username = ?`,
    [username],
    (err, userObj) => {
      if (err) {
        res.send({
          status: false,
          message: err,
        });
      } else if (!userObj[0]) {
        res.send("username is invalid");
      } else if (
        userObj[0].username === username &&
        userObj[0].password === password
      ) {
        res.send({
          username: userObj[0].username,
          password: userObj[0].password,
          message: "login successful",
        });
      } else {
        res.send({
          status: false,
          message: "Password is incorrect",
        });
      }
    }
  );
});

//Get users
app.get("/users", (req, res) => {
  connection.execute(`select * from users`, (err, usersObj) => {
    if (err) {
      res.send(err);
    } else {
      res.send(usersObj);
    }
  });
});

//Get userById
app.get("/user/:id", (req, res) => {
  const userid = req.params.id;
  connection.execute(
    `select * from users where userid = ?`,
    [userid],
    (err, userObj) => {
      if (err) {
        res.send({
          status: false,
          message: err,
        });
      } else {
        res.send(userObj);
      }
    }
  );
});

//Update userById
app.put("/user/:id", (req, res) => {
  // res.send("Update userdata");
  const userid = req.params.id;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const name = firstName + " " + lastName;
  const address = req.body.address;
  const phoneNumber = req.body.phonenumber;
  const emailid = req.body.emailid;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateofbirth; // Format = "1990-01-01"
  // Calculate the age
  const birthDate = new Date(dateOfBirth);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  // Print the age
  // console.log(age);
  if (!dateOfBirth) {
    res.send("Date of birth is required");
  } else if (age <= 18) {
    res.send("Age must be graterthan 18 years");
  } else {
    let query =
      "update users set name = ?, address = ?, phonenumber = ?, emailid = ?, gender = ?, dateofbirth = ? where userid = ?";
    connection.execute(
      query,
      [name, address, phoneNumber, emailid, gender, dateOfBirth, userid],
      (err, userObj, rows, fields) => {
        if (err) {
          res.send({
            status: false,
            message: err,
          });
        } else if (userObj.affectedRows === 0) {
          res.send({
            status: false,
            message: "User_id invalid",
          });
        } else {
          res.send({
            status: true,
            message: userObj,
          });
        }
      }
    );
  }
});

app.listen(4000, () => {
  console.log("running in the port no: 3000");
});
