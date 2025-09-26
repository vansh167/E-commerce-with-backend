import React from 'react'
import './CartItems.css'
import { useShopContext } from '../../context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from "react-router-dom";   
const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useShopContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
 <div className="cartitems-list">
  {all_product.map((e) => {
    if (cartItems[e.id] > 0) {
      return (
        <div key={e.id}>
          <div className="cartitems-format cartitems-format-main">
            <img src={e.image} alt="" className="carticon-product-icon" />
            <p>{e.name}</p>
            <p>₹{e.new_price}</p>
            <button className="cartitems-quantity">{cartItems[e.id]}</button>
            <p>₹{e.new_price * cartItems[e.id]}</p>
            <img
              src={remove_icon}
              alt="Remove"
              onClick={() => removeFromCart(e.id)}
              className="cartitems-remove-icon"
            />
          </div>
          <hr />
        </div>
      );
    }
    return null;
  })}
</div>


        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
                <hr />
              <div className="cartitems-total-item"> 
                <h3>Total</h3>
                <h3>₹{getTotalCartAmount()}</h3>
              </div>
            </div>

         <button
  onClick={() => {
    if (localStorage.getItem("auth-token")) {
      // ✅ user logged in
      navigate("/checkout");
    } else {
      // ❌ user not logged in → redirect to signup
      navigate("/login");
    }
  }}
>
  PROCEED TO CHECKOUT
</button>

          </div>
          <div className="cartitems-promocode">

           
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItems
