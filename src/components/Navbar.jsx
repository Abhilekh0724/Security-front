import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const user = JSON.parse(localStorage.getItem("user"));

  // Conditionally render the navbar based on the current route
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Food
            </a>
            <Link
              className="navbar-toggler"
              type="Link"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Product
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome, {user.firstName}
                    </button>
                    <ul className="dropdown-menu">
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
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="me-2"
                          />
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link
                      to={"/register"}
                      className="btn btn-outline-danger me-2"
                      type="submit"
                    >
                      Register
                    </Link>
                    <Link
                      to={"/login"}
                      className="btn btn-outline-success"
                      type="submit"
                    >
                      Login
                    </Link>
                  </>
                )}
              </form>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
