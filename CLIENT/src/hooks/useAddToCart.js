import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../features/cartSlice";

export function useAddToCart(color, size, quantity = 1, product) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (color && size && size !== "undefined") {
      setAlert(false);
    }
  }, [size, color]);

  const handleClick = () => {
    if (color && size && size !== "undefined") {
      dispatch(
        addProduct({
          ...product,
          quantity,
          color,
          size,
          id: product._id + color + size,
        })
      );
      navigate("/cart");
    } else {
      setAlert(true);
    }
  };

  return { alert, handleClick };
}
