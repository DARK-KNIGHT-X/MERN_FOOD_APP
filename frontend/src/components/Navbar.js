import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav>
      <Link to="/" className="title">
        FOODIE
      </Link>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {/* ✅ Cart link with item count badge */}
        <li>
          <NavLink to="/cart" className="auth-link">
            🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <span className="auth-link">Hi, {user.name}</span>
            </li>
            <li>
              <button className="auth-link" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="auth-link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="auth-link">
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;