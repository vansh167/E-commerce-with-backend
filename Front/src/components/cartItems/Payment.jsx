import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaLock,
  FaShieldAlt,
  FaThumbsUp,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

import "./Payment.css";
import { useShopContext } from "../../context/ShopContext";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, totalAmount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("free");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const { clearCart } = useShopContext();

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME5: 5,
  };

  const deliveryCharges = {
    today: 100,
    fast: 50,
    free: 0,
  }[deliveryOption];

  const finalAmount = (totalAmount || 0) + deliveryCharges;
  const discountAmount = (finalAmount * discountPercent) / 100;
  const discountedAmount = finalAmount - discountAmount;

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (coupons[code]) {
      setDiscountPercent(coupons[code]);
      notifySuccess(`Coupon applied! You got ${coupons[code]}% off.`);
    } else {
      setDiscountPercent(0);
      notifyError("Invalid coupon code!");
    }
  };

  const handleCardChange = (e) => {
    setCardDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateTotalIncome = (amount) => {
    const prevIncome = Number(localStorage.getItem("totalIncome")) || 0;
    localStorage.setItem("totalIncome", (prevIncome + Number(amount)).toFixed(2));
  };

  const saveOrderHistory = (order) => {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    history.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(history));
  };

  const handleConfirmOrder = () => {
    if (!paymentMethod) {
      notifyError("⚠️ Please select a payment method.");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      notifyError("⚠️ Please enter your UPI ID.");
      return;
    }

    if (paymentMethod === "card") {
      const { cardNumber, expiry, cvv, name } = cardDetails;
      if (!cardNumber || !expiry || !cvv || !name) {
        notifyError("⚠️ Please fill in all card details.");
        return;
      }
    }

    // Build order object
    const order = {
      id: Date.now(),
      address,
      paymentMethod,
      deliveryOption,
      amountPaid: discountedAmount.toFixed(2),
      date: new Date().toLocaleString(),
    };

    updateTotalIncome(discountedAmount);
    saveOrderHistory(order);

    notifySuccess(`✅ Order Placed! Total Paid: ₹${discountedAmount.toFixed(2)}`);

    localStorage.removeItem("cart-items");
    clearCart();

    setTimeout(() => navigate("/"), 3000);
  };

  return (
    <div className="payment-wrapper">
      <ToastContainer />
      <h2 className="payment-title">Payment</h2>

      <div className="payment-content">
        {/* Left Section: Delivery Address & Security */}
        <div className="payment-left">
          <h3>Delivery Address</h3>
          {address ? (
            <p>
              <b>Name:</b> {address.name} <br />
              <b>Phone:</b> {address.phone} <br />
              <b>Address:</b> {address.address} <br />
              <b>City:</b> {address.city} <br />
              <b>Pincode:</b> {address.pincode}
            </p>
          ) : (
            <p>No address found</p>
          )}

          <div className="payment-bottom">
            <div className="security-item">
              <FaLock size={30} color="#4caf50" />
              <span>100% Secure Payment</span>
            </div>
            <div className="security-item">
              <FaShieldAlt size={30} color="#2196f3" />
              <span>Verified Checkout</span>
            </div>
            <div className="security-item">
              <FaThumbsUp size={30} color="#ff9800" />
              <span>Trusted by Thousands</span>
            </div>
            <div className="security-item payment-brands">
              <FaCcVisa size={30} color="#1a1f71" />
              <FaCcMastercard size={30} color="#eb001b" />
              <FaCcPaypal size={30} color="#003087" />
            </div>
          </div>
        </div>

        {/* Right Section: Payment, Delivery, Coupon */}
        <div className="payment-right">
          <h3>Select Payment Method</h3>
          <select
            className="payment-dropdown"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">-- Select Payment Method --</option>
            <option value="upi">💳 UPI (Google Pay / PhonePe)</option>
            <option value="card">💳 Credit / Debit Card</option>
            <option value="cod">💵 Cash on Delivery</option>
          </select>

          {paymentMethod === "upi" && (
            <div className="upi-box">
              <input
                type="text"
                placeholder="Enter UPI ID (@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="card-details">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                maxLength={16}
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
              />
              <div className="card-row">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name"
                value={cardDetails.name}
                onChange={handleCardChange}
              />
            </div>
          )}

          <h3>Delivery Options</h3>
          {["today", "fast", "free"].map((option) => {
            const labelMap = {
              today: "Deliver Today (₹100)",
              fast: "Deliver in 1-2 Days (₹50)",
              free: "Standard Delivery (Free)",
            };
            return (
              <label key={option}>
                <input
                  type="radio"
                  name="delivery"
                  value={option}
                  checked={deliveryOption === option}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                {labelMap[option]}
              </label>
            );
          })}

          <div className="coupon-box">
            <h3>Have a Coupon?</h3>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="apply-coupon-btn" onClick={handleApplyCoupon}>
              Apply
            </button>
            {discountPercent > 0 && (
              <p className="coupon-success">
                🎉 You saved {discountPercent}% on this order!
              </p>
            )}
          </div>

          <div className="final-summary">
            <p>Cart Total: ₹{totalAmount?.toFixed(2) || "0.00"}</p>
            <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
            {discountPercent > 0 && <p>Discount: -₹{discountAmount.toFixed(2)}</p>}
            <h3>Final Amount: ₹{discountedAmount.toFixed(2)}</h3>
          </div>

          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
