import Products from "../../components/products/Products";
import { colors, sizes } from "../../constants/colors and sizes";
import "./index.css";
import { useParams, useSearchParams } from "react-router-dom";

const ProductList = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    p: 1,
    sort: "newest",
  });
  const color = searchParams.get("colors");
  const size = searchParams.get("sizes");
  const sort = searchParams.get("sort");

  const handleChange = e => {
    const value = e.target.value;
    setSearchParams(
      prev => {
        prev.set("p", 1);
        prev.set([e.target.name], value);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <section className='product-list'>
      <h1 className='title'>{category?.toUpperCase()}</h1>
      <div className='filters'>
        <div className='filter'>
          {/* <span className='text'>Filter Product:</span> */}
          <span className='text'>Color: </span>
          <select
            name='colors'
            defaultValue={color}
            onChange={e => handleChange(e)}>
            <option value={""}>All</option>
            {colors.map(color => (
              <option key={color}>{color}</option>
            ))}
          </select>
          <span className='text'>Size :</span>
          <select
            name='sizes'
            defaultValue={size}
            onChange={e => handleChange(e)}>
            <option value=''>All</option>
            {sizes.map(size => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className='filter'>
          <span className='text'>Sort Products:</span>
          <select
            defaultValue='newest'
            onChange={e => {
              setSearchParams(
                prev => {
                  prev.set("sort", e.target.value);
                  return prev;
                },
                { replace: true }
              );
            }}>
            <option value='newest'>Newest</option>
            <option value='asc'>Price (asc)</option>
            <option value='desc'>Price (desc)</option>
          </select>
        </div>
      </div>
      <Products category={category} sort={sort} color={color} size={size} />
    </section>
  );
};

export default ProductList;
