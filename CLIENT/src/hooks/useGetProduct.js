import { useEffect, useState } from "react";
import api from "../api/axios";

export function useGetProduct(id) {
  const [product, setProduct] = useState();
  useEffect(() => {
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        const response = await api.get("/products/find/" + id, {
          signal: controller.signal,
        });
        setProduct(response.data);
      } catch (err) {
        if (err.message === "canceled") {
          return console.log("Aborted");
        }
        err.response
          ? console.log(err.response)
          : err.request
          ? console.log(err.request)
          : console.log("Error: " + err.message);
        console.log(err.config);
      }
    };
    getProduct();
    return () => controller.abort();
  }, [id]);
  return product;
}
