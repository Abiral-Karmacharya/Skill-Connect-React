import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import Homepage from "./assets/pages/homepage";
import Signup from "./assets/pages/signup";
import Login from "./assets/pages/login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./assets/pages/dashboard-user";
import Pricing from "./assets/pages/pricing";
import StartNav from "./assets/pages/components/StartNav";
import Nav1 from "./assets/pages/components/Nav1";

import Profile from "./assets/pages/profile";

function AppRoutes() {
  const location = useLocation();
  const startnav = ["/", "/pricing"];
  const startnavshow = startnav.includes(location.pathname.toLowerCase());

  const nav1 = ["/dashboard"];
  const nav1show = nav1.includes(location.pathname.toLowerCase());

  return (
    <>
      {startnavshow && <StartNav />}
      {nav1show && <Nav1 />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
