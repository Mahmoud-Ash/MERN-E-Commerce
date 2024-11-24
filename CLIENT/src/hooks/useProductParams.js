import { useSearchParams } from "react-router-dom";

export function useProductParams(product) {
  const [searchParams, setSearchParams] = useSearchParams({
    quantity: 1,
    size: product?.sizes[0],
  });

  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const quantity = +searchParams.get("quantity");

  return { setSearchParams, color, size, quantity };
}
