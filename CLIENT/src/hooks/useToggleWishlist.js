import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/wishlistSlice";

export function useToggleWishlist(item) {
  const [isFaved, setIsFaved] = useState(false);
  const { products } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    const existingIndex = products.findIndex(
      product => product._id === item._id
    );
    if (existingIndex !== -1) {
      setIsFaved(true);
    } else {
      setIsFaved(false);
    }
  }, [item, products]);

  function toggleFaved() {
    dispatch(addToWishlist(item));
  }

  return { isFaved, toggleFaved };
}
