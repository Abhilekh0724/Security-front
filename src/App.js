import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Loginpage from "./pages/login/Loginpage";
import Registerpage from "./pages/register/Registerpage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Loginpage/> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        1<Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
