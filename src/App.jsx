import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Homepage from "./assets/pages/homepage";
import Signup from "./assets/pages/signup";
import Login from "./assets/pages/login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Homepage></Homepage>}></Route>
        <Route path="/Signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
