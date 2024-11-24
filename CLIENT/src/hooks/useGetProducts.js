import { useEffect, useState } from "react";
import { publicRequest } from "../api/axios";

export function useGetProducts(category) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? "/products?category=" + category : "/products",
          { signal: controller.signal }
        );
        setProducts(res.data);
      } catch (err) {
        if (err.message === "canceled") {
          return console.log("Aborted");
        }
        err.response
          ? console.log(err.response)
          : err.request
          ? console.log(err.request)
          : console.log("Error: " + err.message);
        console.log(err);
      }
    };
    getProducts();
    return () => controller.abort();
  }, [category]);

  return { products };
}
