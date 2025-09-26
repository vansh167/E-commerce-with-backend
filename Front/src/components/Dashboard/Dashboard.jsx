import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import OrderHistory from "../OrderHisory/OrderHistory";

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const income = Number(localStorage.getItem("totalIncome")) || 0;
    setTotalIncome(income);

    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrderHistory(history);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    setTotalUsers(users.length);
  }, []);

  // Delete order and update totalIncome
  const handleDeleteOrder = (orderId) => {
    const updatedHistory = orderHistory.filter((order) => order.id !== orderId);
    const deletedOrder = orderHistory.find((order) => order.id === orderId);

    if (deletedOrder) {
      const newIncome = (totalIncome - Number(deletedOrder.amountPaid)).toFixed(2);
      setTotalIncome(Number(newIncome));
      localStorage.setItem("totalIncome", newIncome);
    }

    setOrderHistory(updatedHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="dashboard-wrapper">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-boxes">
        <div className="dashboard-box income-box">
          <h3>Total Income</h3>
          <p>₹{totalIncome.toFixed(2)}</p>
        </div>
        <div className="dashboard-box orders-box">
          <h3>Total Orders</h3>
          <p>{orderHistory.length}</p>
        </div>
        <div className="dashboard-box users-box">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>

      <OrderHistory
        orderHistory={orderHistory}
        onDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};

export default Dashboard;
