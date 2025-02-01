import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faSearch, faCalendarAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { logoutUserApi } from "../api/Api";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");

  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  const handleLogout = async () => {
    try {
      if (user) {
        await logoutUserApi();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success('Logged out successfully');
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
      {showNavbar && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm py-3">
          <div className="container">
            {/* Brand Logo */}
            <Link className="navbar-brand d-flex align-items-center" to="/homepage">
              <img src="/assets/images/mainlogo.png" alt="Wedding Logo" style={{ maxWidth: "80px", marginRight: "10px" }} />
            </Link>

            {/* Toggler Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Items */}
            <div className="collapse navbar-collapse" id="navbarContent">
              {/* Search Bar */}
              <div className="mx-auto" style={{ flex: 1 }}>
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                  <input
                    className="form-control rounded-pill px-4"
                    type="search"
                    placeholder="Search venues..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-light rounded-circle ms-3" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </div>

              {/* Profile and Auth Buttons */}
              <div className="d-flex align-items-center">
                {user ? (
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-light dropdown-toggle rounded-pill px-4 ms-3" 
                      type="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faUser} className="me-2" /> My Account
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={`/book/bookeduser`}>
                          <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                          My Bookings
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-outline-danger me-2 rounded-pill px-3">
                      Register
                    </Link>
                    <Link to="/login" className="btn btn-outline-success rounded-pill px-3">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
