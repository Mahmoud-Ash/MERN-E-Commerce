/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import "./index.css";
import { FavoriteBorderRounded, SearchOutlined } from "@mui/icons-material";
import { useToggleWishlist } from "../../hooks/useToggleWishlist";

const Product = ({ item }) => {
  const { isFaved, toggleFaved } = useToggleWishlist(item);

  return (
    <div className='product'>
      <img src={item.image} alt='product' />
      <h2>{item.name}</h2>
      <p>$ {item.price}</p>
      <div className='info'>
        <Link to={`/product/${item._id}`}>
          <i>
            <SearchOutlined />
          </i>
        </Link>
        <i onClick={toggleFaved} className={isFaved ? "wishlisted" : ""}>
          <FavoriteBorderRounded />
        </i>
      </div>
    </div>
  );
};

export default Product;
