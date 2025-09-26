import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Sidebar.css";
 import { MdDashboard } from "react-icons/md";
import add_product_icon from "../../assets/Product_cart.svg";
import list_product_icon from "../../assets/product_list_icon.svg";

const Sidebar = () => {
  const location = useLocation(); // Get current path

  return (
    <div className="sidebar">
      <Link to="/admin/addproduct" style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/addproduct' ? 'active' : ''}`}>
          <img src={add_product_icon} alt="Add Product Icon" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/admin/listproduct" style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/listproduct' ? 'active' : ''}`}>
          <img src={list_product_icon} alt="Product List Icon" />
          <p>Product List</p>
        </div>
      </Link>
       <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <MdDashboard style={{fontSize:"25px", color:"red"}}/>
          <p>Dashboard</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
