import { NavLink } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";
import logo from "../../assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";
import user from "../../assets/user.png";

const Navbar = () => {
  const { getTotalCartItem } = useShopContext();

  const navItems = [
    { to: "/", label: "Shop", exact: true },
    { to: "/mens", label: "Men" },
    { to: "/womens", label: "Women" },
    { to: "/kids", label: "Kids" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#E3E6F3",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)",
          width: "100%",
        }}
      >
        {/* Logo */}
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </NavLink>

        {/* Hamburger Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 custom-nav-list">
            {navItems.map(({ to, label, exact }) => (
              <li key={to} className="nav-item">
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Section (Cart + User Dropdown) */}
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/cart" className="position-relative">
              <img src={cart_icon} alt="cart" style={{ height: "25px" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartItem()}
              </span>
            </NavLink>

            <div className="dropdown">
              <img
                src={user}
                alt="User"
                className="navbar-user dropdown-toggle"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <ul
                className="dropdown-menu dropdown-menu-end custom-dropdown"
                aria-labelledby="userDropdown"
              >
                <li>
                  <NavLink className="dropdown-item" to="/orders">
                    <i className="bi bi-truck me-2"></i> Track Your Order
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/settings">
                    <i className="bi bi-gear me-2"></i> Settings
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {localStorage.getItem("auth-token") ? (
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        localStorage.removeItem("auth-token");
                        window.location.replace("/");
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink className="dropdown-item" to="/login">
                      <i className="bi bi-box-arrow-in-right me-2"></i> Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
