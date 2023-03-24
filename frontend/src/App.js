import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import UserData from "./Components/UserData";
import Updateuser from "./Components/Updateuser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserData />} />
        <Route path="/update" element={<Updateuser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
