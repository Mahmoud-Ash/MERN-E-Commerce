import Home from "./pages/Home";
import Resgister from "./pages/register/Resgister";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductList from "./pages/productList/ProductList";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Wishlist from "./pages/wishlist/Wishlist";
import Success from "./pages/success/Success";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='products/:category' element={<ProductList />} />
        <Route path='product/:id' element={<SingleProduct />} />
        <Route path='cart' element={<Cart />} />
        <Route path='wishlist' element={<Wishlist />} />
      </Route>
      <Route
        path='register'
        element={!currentUser ? <Resgister /> : <Navigate to={"/"} />}
      />
      <Route
        path='login'
        element={!currentUser ? <Login /> : <Navigate to={"/"} />}
      />
      <Route path='success' element={<Success />} />
    </Routes>
  );
}

export default App;
