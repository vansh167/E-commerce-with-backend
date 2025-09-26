import React from "react";
import '../Dashboard/Dashboard.css';

const OrderHistory = ({ orderHistory, onDeleteOrder }) => {
  if (!orderHistory.length) {
    return <p>No orders found in history.</p>;
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Amount Paid (₹)</th>
            <th>Payment Method</th>
            <th>Delivery Option</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map(({ id, address, paymentMethod, deliveryOption, amountPaid, date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{date}</td>
              <td>{amountPaid}</td>
              <td>{paymentMethod}</td>
              <td>{deliveryOption}</td>
              <td>
                {address?.name}, {address?.address}, {address?.city} - {address?.pincode}
              </td>
              <td>
                <button onClick={() => onDeleteOrder(id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
