import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Conditionally render the navbar based on the current route
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Your logo here */}
            <Link className="navbar-brand" to="#">
              <img src="assets/images/vend.png" alt="Your Logo" style={{ maxWidth: '70px' }} />
            </Link>
            <div style={{ flex: 2, textAlign: 'center' }}>
              <form className="d-flex" role="search" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ borderRadius: '20px', padding: '10px' }}
                />
                <button className="btn btn-outline-success" type="submit" style={{ borderRadius: '20px', padding: '10px 15px' }}>
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
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="#">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Setting
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Logout
                      </Link>
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
