import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; // Scoped CSS

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { path: "/garage", label: "Parking Garage" },
              { path: "/tictactoe", label: "Tic Tac Toe" },
              { path: "/binary-tree", label: "Binary Tree" }, // New Menu Item
              { path: "/sorting-visualizer", label: "Sorting Visualizer"},
              { path: "/towers-of-hanoi", label:"Towers of Hanoi"},
            ].map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                  to={path}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
