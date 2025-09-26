import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderSuccessPage.css"; // Optional: Create this for styling

const OrderSuccessPage = () => {
  const location = useLocation();
  const { totalAmount, address, paymentMethod, deliveryOption } = location.state || {};

  return (
    <div className="order-success-container">
      <h2>🎉 Order Successful!</h2>

      <div className="order-details">
        <h3>🧾 Order Summary</h3>
        <p><strong>Amount Paid:</strong> ₹{totalAmount}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Delivery Method:</strong> {deliveryOption}</p>
      </div>

      <div className="shipping-address">
        <h3>📦 Shipping Address</h3>
        {address ? (
          <>
            <p><strong>Name:</strong> {address.name}</p>
            <p><strong>Phone:</strong> {address.phone}</p>
            <p><strong>Address:</strong> {address.address}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>Pincode:</strong> {address.pincode}</p>
          </>
        ) : (
          <p>No address available</p>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessPage;
