import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt, faSearch, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");

  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";
asa
  useEffect(() => {
    // Manually initialize Bootstrap dropdowns
    const dropdownToggleList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownToggleList.map(function (dropdownToggle) {
      return new window.bootstrap.Dropdown(dropdownToggle);
    });
  }, []); // Empty dependency array ensures this effect runs only once

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link className="navbar-brand" to="/homepage">
              <img src="/assets/images/vend.png" alt="Your Logo" style={{ maxWidth: "70px" }} />
            </Link>
            <div style={{ flex: 20, textAlign: "center" }}>
              <form className="d-flex" role="search" style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }} onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: "20px", padding: "10px" }}
                />
                <button className="btn btn-outline-success" type="submit" style={{ borderRadius: "20px", padding: "10px 15px" }}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
            <div className="d-flex justify-content-end" style={{ flex: 1 }}>
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/book-venue">
                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                        Book Venue
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/register" className="btn btn-outline-danger me-2" type="button">
                    Register
                  </Link>
                  <Link to="/login" className="btn btn-outline-success" type="button">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
