import "./index.css";
import Product from "./Product";
import { useFilters } from "../../hooks/useFilters";
import { useGetProducts } from "../../hooks/useGetProducts";
import { usePagination } from "../../hooks/usePagination";

// eslint-disable-next-line react/prop-types
const Products = ({ category, sort, color, size }) => {
  const { products } = useGetProducts(category);
  const filteredItems = useFilters({
    products,
    sort,
    color,
    size,
  });
  const { pages, pageItems, setSearchParams, currentPage } =
    usePagination(filteredItems);

  return (
    <section className='productsList'>
      {pageItems.map(item => (
        <Product item={item} key={item._id} />
      ))}
      <nav className='pagination'>
        {pages.map((page, i) =>
          pages.length > 1 ? (
            <button
              className={currentPage === page ? "active" : "pagination-icon"}
              onClick={() =>
                setSearchParams(
                  param => {
                    param.set("p", page);
                    return param;
                  },
                  { replace: true }
                )
              }
              key={i}>
              {page}
            </button>
          ) : null
        )}
      </nav>
    </section>
  );
  // return (
  //   <section className='productsList'>
  //     {category
  //       ? filteredItems?.map(item => <Product item={item} key={item.id} />)
  //       : items?.slice(0, 8).map(item => <Product item={item} key={item.id} />)}
  //     <nav>
  //       {pages.map((page, i) => (
  //         <button key={i}>{page}</button>
  //       ))}
  //     </nav>
  //   </section>
  // );
};

export default Products;
