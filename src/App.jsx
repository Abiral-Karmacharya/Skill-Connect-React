import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Homepage from "./assets/pages/homepage";
import Signup from "./assets/pages/signup";
import Login from "./assets/pages/login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./assets/pages/dashboard-user";

const App = () => {
  return (
    <Router>
      <Toaster></Toaster>
      <Routes>
        <Route path="" element={<Homepage></Homepage>}></Route>
        <Route path="/Signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
