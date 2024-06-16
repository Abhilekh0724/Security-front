import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import Loginpage from "./pages/login/Loginpage";
import Registerpage from "./pages/register/Registerpage";
import SearchResults from "./pages/search/searchpage";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Router>
      {/* <Loginpage/> */}
      <Navbar />
      <ToastContainer />
      <Routes> 
        <Route path="/homepage" element={<Homepage />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/searchpage" element={<SearchResults />} /> 
        <Route path="/nabbar" element={<Navbar />} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </Router>
  );
}

export default App;
