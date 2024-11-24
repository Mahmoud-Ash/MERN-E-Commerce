import { useEffect, useState } from "react";
import api from "../api/axios";

export function useDebouncedSearch(search, delay = 500) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);
    return () => clearTimeout(timeout);
  }, [search, delay]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch !== " ") {
      const fetchProducts = async () => {
        try {
          const response = await api.get(
            `/products/search?q=${debouncedSearch}`
          );
          setSearchResults(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchProducts();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  return searchResults;
}
