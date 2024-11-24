import { useEffect, useState } from "react";
import { publicRequest } from "../api/axios";

export function useGetCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const getCategories = async () => {
      try {
        const res = await publicRequest.get("/categories", {
          signal: controller.signal,
        });
        setCategories(res.data);
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
    getCategories();
    return () => controller.abort();
  }, []);

  return { categories };
}
