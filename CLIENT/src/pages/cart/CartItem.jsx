/* eslint-disable react/prop-types */
import { Add, Remove } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { decProduct, incProduct } from "../../features/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      incProduct({
        id: item.id,
        quantity: +item.quantity + 1,
        price: item.price,
      })
    );
  };

  const handleRemove = () => {
    dispatch(
      decProduct({
        id: item.id,
        quantity: +item.quantity - 1,
        price: item.price,
      })
    );
  };

  return (
    item && (
      <div className='checkout-product'>
        <div className='product-detail'>
          <img src={item.image} alt='product' />
          <div className='details'>
            <span>
              <b>Product:</b> {item.name}
            </span>
            <span>
              <b>ID:</b> {item._id}
            </span>
            <div
              style={{ backgroundColor: `${item.color.toLowerCase()}` }}
              id='product-color'></div>
            <span>
              <b>Size:</b> {item.size}
            </span>
          </div>
        </div>
        <div className='price-detail'>
          <div className='amount-container'>
            <i>
              <Remove onClick={handleRemove} />
            </i>
            <span id='quantity'>{item.quantity}</span>
            <i>
              <Add onClick={handleAdd} />
            </i>
          </div>
          <span className='price'>
            $ {(item.price * item.quantity).toFixed(2)}
          </span>
          <hr />
        </div>
      </div>
    )
  );
};

export default CartItem;
