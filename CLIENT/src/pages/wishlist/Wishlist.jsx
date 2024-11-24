import { useSelector } from "react-redux";
import Product from "../../components/products/Product";
import "./index.css";
import { Link } from "react-router-dom";

function Wishlist() {
  const { products } = useSelector(state => state.wishlist);

  return products.length !== 0 ? (
    <section className='wishlist'>
      <h1 style={{ margin: "20px", fontWeight: "700" }}>WISHLIST</h1>
      <div className='productsList'>
        {products.map(product => (
          <Product item={product} key={product._id} />
        ))}
      </div>
    </section>
  ) : (
    <section className='empty-wishlist'>
      <h1 style={{ margin: "20px", fontWeight: "700" }}>
        Your wishlist is empty
      </h1>
      <Link to={"/"} style={{ margin: "20px" }}>
        {" "}
        Go back to homepage
      </Link>
    </section>
  );
}

export default Wishlist;
