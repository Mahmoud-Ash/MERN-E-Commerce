import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./index.css";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import axios from "../../api/axios";
import { clearCart } from "../../features/cartSlice";

const Cart = () => {
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const { products, quantity, total } = useSelector(state => state.cart);
  const roundedTotal = total.toFixed(2);
  const wishlist = useSelector(state => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onToken(token) {
    console.log(token);
    if (!token) return;
    try {
      setPaymentStatus("processing");
      const res = await axios.post("/checkout/payment", {
        tokenId: token.id,
        amount: roundedTotal * 100,
      });
      setPaymentStatus("successfull");
      console.log(res.data);
      dispatch(clearCart());
      navigate("/success", { state: res.data });
    } catch (err) {
      setPaymentStatus("rejected");
      console.log(err.response.data);
    }
  }

  return (
    <div>
      <div className='cart-container'>
        <h1 className='title'>YOUR BAG</h1>
        <div className='top'>
          <button className='shopping-button' onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </button>
          <span className='text'>Shopping Bag( {quantity} )</span>
          <span className='text'>
            Your Wishlist( {wishlist.products.length} )
          </span>
          <button
            className='checkout-button'
            onClick={() => navigate("/wishlist")}>
            SEE WISHLIST
          </button>
        </div>
        <div className='bottom'>
          <div className='info'>
            {products?.map(product => (
              <CartItem key={product.id} item={product} />
            ))}
          </div>
          <div className='summary'>
            <h1 className='summary-title'>ORDER SUMMARY</h1>
            <div className='summary-item'>
              <span className='summary-item-text'>Subtotal</span>
              <span className='summary-item-price'>$ {roundedTotal}</span>
            </div>
            <div className='summary-item'>
              <span className='summary-item-text'>Estimated Shipping</span>
              <span className='summary-item-price'>$ 5.9</span>
            </div>
            <div className='summary-item'>
              <span className='summary-item-text'>Shipping Discount</span>
              <span className='summary-item-price'>$ -5.9</span>
            </div>
            <div className='summary-item'>
              <span className='summary-total'>Total</span>
              <span className='summary-total'>$ {roundedTotal}</span>
            </div>
            {paymentStatus === "processing" ? (
              <button disabled className='checkout-button'>
                Redirecting. Please wait...
              </button>
            ) : (
              <StripeCheckout
                name='A S H Shop'
                image='https://static.vecteezy.com/system/resources/previews/009/165/942/original/ash-letter-logo-design-with-polygon-shape-ash-polygon-and-cube-shape-logo-design-ash-hexagon-logo-template-white-and-black-colors-ash-monogram-business-and-real-estate-logo-vector.jpg'
                billingAddress
                shippingAddress
                description={` Your total is $${roundedTotal} `}
                amount={Math.ceil(roundedTotal * 100)}
                token={onToken}
                stripeKey={import.meta.env.VITE_REACT_APP_STRIPE}>
                <button className='checkout-button'>CHECKOUT NOW</button>
              </StripeCheckout>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
