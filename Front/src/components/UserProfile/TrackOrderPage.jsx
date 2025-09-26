import React, { useEffect, useState } from "react";
import "./TrackOrderPage.css";

const TrackOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [cancelReview, setCancelReview] = useState("");
  const [activeCancelOrderId, setActiveCancelOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("customer-orders")) || [];
    // Sort active orders first, then cancelled; within each group sort by date desc
    const sortedOrders = storedOrders.sort((a, b) => {
      if (a.status === "Cancelled" && b.status !== "Cancelled") return 1; // cancelled last
      if (a.status !== "Cancelled" && b.status === "Cancelled") return -1; // active first
      // same status => sort by date descending
      return new Date(b.orderDate) - new Date(a.orderDate);
    });
    setOrders(sortedOrders);
    setLoading(false);
  }, []);

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  const estimateDelivery = (orderDate, deliveryType) => {
    const baseDate = new Date(orderDate);
    const daysToAdd =
      deliveryType === "Today Delivery"
        ? 1 + Math.floor(Math.random() * 2)
        : 1 + Math.floor(Math.random() * 5);
    const estimated = new Date(baseDate.setDate(baseDate.getDate() + daysToAdd));
    return estimated.toLocaleDateString();
  };

  const handleCancelClick = (orderId) => {
    setActiveCancelOrderId(activeCancelOrderId === orderId ? null : orderId);
    setCancelReview("");
  };

  const handleCancelOrder = (orderId) => {
    if (!cancelReview.trim()) {
      alert("⚠️ Please provide a reason for cancellation.");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "Cancelled", cancelReason: cancelReview }
        : order
    );

    // Sort again after cancelling
    const sortedOrders = updatedOrders.sort((a, b) => {
      if (a.status === "Cancelled" && b.status !== "Cancelled") return 1;
      if (a.status !== "Cancelled" && b.status === "Cancelled") return -1;
      return new Date(b.orderDate) - new Date(a.orderDate);
    });

    setOrders(sortedOrders);
    localStorage.setItem("customer-orders", JSON.stringify(sortedOrders));
    setCancelReview("");
    setActiveCancelOrderId(null);
  };

  const handleDeleteCancelled = (orderId) => {
    const filteredOrders = orders.filter((order) => order.id !== orderId);
    setOrders(filteredOrders);
    localStorage.setItem("customer-orders", JSON.stringify(filteredOrders));
  };

  if (loading) return <div className="track-container">⏳ Loading your orders...</div>;
  if (orders.length === 0) return <div className="track-container no-orders">🚫 No orders found.</div>;

  return (
    <div className="track-container">
      <h2>📦 Track Your Orders</h2>
      <p className="track-subtitle">Below is a list of all orders you've placed. You can cancel items before they are shipped.</p>

      <div className="order-scroll-container">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-info">
              <p><b>Order ID:</b> {order.id}</p>
              <p><b>Placed On:</b> {formatDate(order.orderDate)}</p>
              <p><b>Total:</b> ₹{order.totalAmount}</p>
              <p><b>Delivery Type:</b> {order.deliveryType}</p>
              <p><b>Estimated Delivery:</b> {estimateDelivery(order.orderDate, order.deliveryType)}</p>
              <p>
                <b>Status:</b>{" "}
                <span className={order.status === "Cancelled" ? "status-cancelled" : "status-placed"}>
                  {order.status}
                </span>
                {order.status === "Cancelled" && (
                  <button
                    onClick={() => handleDeleteCancelled(order.id)}
                    className="btn-delete-cancelled"
                    title="Delete Cancelled Order"
                    style={{
                      marginLeft: "10px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "red",
                      fontSize: "16px",
                      verticalAlign: "middle",
                    }}
                  >
                    🗑️
                  </button>
                )}
              </p>

              {/* Delivery Progress */}
              {order.status === "Cancelled" ? (
                <p className="cancel-reason">❌ <b>Reason for cancellation:</b> {order.cancelReason}</p>
              ) : (
                <div className="delivery-steps">
                  <span className="step active">📍 Placed</span>
                  <span className={`step ${order.status !== "Order Placed" ? "active" : ""}`}>🚚 In Transit</span>
                  <span className={`step ${order.status === "Delivered" ? "active" : ""}`}>✅ Delivered</span>
                </div>
              )}

              {/* Cancel Button */}
              {order.status === "Order Placed" && (
                <>
                  <button
                    className="btn-cancel-toggle"
                    onClick={() => handleCancelClick(order.id)}
                  >
                    {activeCancelOrderId === order.id ? "Close Cancel Form" : "Cancel Order"}
                  </button>

                  {activeCancelOrderId === order.id && (
                    <div className="cancel-section">
                      <textarea
                        placeholder="Please provide a reason for cancellation..."
                        value={cancelReview}
                        onChange={(e) => setCancelReview(e.target.value)}
                        rows={3}
                        maxLength={300}
                      />
                      <button
                        className="btn-confirm-cancel"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Confirm Cancellation
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrderPage;
