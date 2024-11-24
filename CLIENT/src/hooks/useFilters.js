import { useEffect, useState } from "react";

export function useFilters({ products, sort, color, size }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) =>
      sort === "asc"
        ? a.price - b.price
        : sort === "desc"
        ? b.price - a.price
        : b.createdAt - a.createdAt
    );
    setSortedItems(sorted);
  }, [sort, products]);

  useEffect(() => {
    setFilteredItems(
      sortedItems?.filter(
        item =>
          (color ? item.colors.includes(color) : true) &&
          (size ? item.sizes.includes(size) : true)
      )
    );
  }, [sortedItems, color, size]);

  return filteredItems;
}
