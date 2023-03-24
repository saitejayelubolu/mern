const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { auth } = require("./config/JWT");
var validator = require("validator");
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookie());
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

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

app.get("/", auth, (req, res) => {
  res.send("get success");
});

//Signup
app.post("/signup", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const name = firstName + " " + lastName;
  const address = req.body.address;
  const phoneNumber = req.body.phonenumber;
  const emailid = req.body.emailid;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateofbirth; // Format = "1990-01-01"
  const username = req.body.username;
  const newPassword = req.body.newpassword;
  const confirmPassword = req.body.confirmpassword;

  connection.execute(
    `select username from users where username =?`,
    [username],
    async (err, usernameObj) => {
      if (err) {
        res.send(err);
      } else if (usernameObj[0]) {
        res.send("this username is already registered");
      } else {
        if (newPassword != confirmPassword) {
          res.send("Password is not matched");
        } else {
          let password = newPassword;
          //hash
          const salt = await bcrypt.genSalt(10);
          const hashPassword = bcrypt.hash(password, salt);
          password = await hashPassword;
          // Calculate the age
          const birthDate = new Date(dateOfBirth);
          const ageDiffMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDiffMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          // Print the age

          if (!dateOfBirth) {
            res.send("Date of birth is required");
          } else if (age <= 18) {
            res.send("Age must be graterthan 18 years");
          } else if (validator.isEmail(emailid) == false) {
            res.send("Please enter valid email");
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
app.post("/login", async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  connection.execute(
    `select username, password, userid from users where username = ?`,
    [username],
    async (err, userObj) => {
      if (userObj) {
        // console.log("db pwd", userObj[0].password);
        const match = await bcrypt.compare(password, userObj[0].password);
        if (err) {
          res.send({
            status: false,
            message: err,
          });
        } else if (!userObj[0]) {
          res.send("username is invalid");
        } else if (match) {
          // create token
          const token = createToken(userObj.userid);
          res.cookie("access-token", token);
          res.send({
            status: true,
            userid: userObj[0].userid,
            username: userObj[0].username,
            password: userObj[0].password,
            token: token,
            message: "login successful",
          });
        } else {
          res.send({
            status: false,
            message: "Password is incorrect",
          });
        }
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
app.put("/user/:id", auth, (req, res) => {
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
  console.log(name);
  // Calculate the age
  const birthDate = new Date(dateOfBirth);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  // Print the age
  console.log(dateOfBirth);
  if (!dateOfBirth) {
    res.send({ status: false, message: "Date of birth is required" });
  } else if (age <= 18) {
    res.send("Age must be graterthan 18 years");
  } else if (validator.isEmail(emailid) == false) {
    res.send("Please enter valid email");
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
  console.log("running in the port no: 4000");
});
