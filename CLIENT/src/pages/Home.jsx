import Slider from "../components/slider/Slider";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import { useRef } from "react";

const Home = () => {
  const catRef = useRef();

  return (
    <main>
      <Slider ref={catRef} />
      <Categories ref={catRef} />
      <Products />
    </main>
  );
};

export default Home;
