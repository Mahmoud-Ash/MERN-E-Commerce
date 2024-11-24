import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination(items) {
  const [searchParams, setSearchParams] = useSearchParams({
    p: 1,
  });
  const currentPage = +searchParams.get("p");
  const itemsPerPage = 9;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const pageItems = items?.slice(firstItemIndex, lastItemIndex);
  const pages = [];
  for (
    let i = 1;
    i <= (itemsPerPage && Math.ceil(items?.length / itemsPerPage));
    i++
  ) {
    pages.push(i);
  }
  useEffect(() => {
    !currentPage && setSearchParams("p=1");
  }, [currentPage, setSearchParams]);

  return {
    pages,
    currentPage,
    pageItems,
    searchParams,
    setSearchParams,
  };
}
