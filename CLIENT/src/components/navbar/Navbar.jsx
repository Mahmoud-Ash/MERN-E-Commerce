import { CiHeart, CiSearch, CiShoppingCart } from "react-icons/ci";
import "./index.css";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";
import { Logout } from "@mui/icons-material";
import { logout } from "../../features/userSlice";

const Navbar = () => {
  const [search, setSearch] = useState();
  const searchResults = useDebouncedSearch(search, 200);
  const { quantity } = useSelector(state => state.cart);
  const { products } = useSelector(state => state.wishlist);
  const { currentUser } = useSelector(state => state.user);
  const searchRef = useRef();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // dispatch(clearUser());
    // dispatch(clearCart());
    // dispatch(clearwishlist());
    // localStorage.clear();
    dispatch(logout());
  };

  return (
    <nav className='nav-bar'>
      <ul className='wrapper'>
        <li className='left-nav'>
          <span className='language'>EN</span>
          <form className='search-container'>
            <input
              type='text'
              className='search-bar'
              placeholder='Search'
              onChange={e => {
                setSearch(e.target.value);
              }}
              onBlur={() =>
                setTimeout(() => (searchRef.current.className = "hidden"), 100)
              }
              onFocus={() => (searchRef.current.className = "search-list")}
            />
            <CiSearch style={{ color: "gray", fontSize: "16px" }} />
            <div className='search-list' ref={searchRef}>
              {searchResults?.slice(0, 10).map(item => (
                <Link
                  className='search-list-item'
                  key={item._id}
                  to={"/product/" + item._id}>
                  <span>{item.name}</span>
                  <CiSearch style={{ color: "gray", fontSize: "16px" }} />
                </Link>
              ))}
            </div>
          </form>
        </li>
        <li className='center-nav'>
          <Link to={"/"} id='logo'>
            ASH.
          </Link>
        </li>
        <li className='right-nav'>
          {/* <Link
            to={"/register"}
            className='menu-item'
            style={{ display: user && "none" }}>
            REGISTER
            </Link> */}
          {!currentUser ? (
            <Link to={"/login"} className='menu-item'>
              SIGN IN
            </Link>
          ) : (
            <Link
              to={"/"}
              onClick={handleLogout}
              className='menu-item'
              style={{ order: "3" }}>
              <Logout style={{ fontSize: "20px" }} />
            </Link>
          )}
          <div className='menu-item'>
            <Link to={"/wishlist"}>
              <Badge badgeContent={products.length} color='secondary'>
                <CiHeart
                  style={{
                    color: "black",
                    fontSize: "25px",
                  }}
                />
              </Badge>
            </Link>
          </div>
          <div className='menu-item'>
            <Link to={"/cart"}>
              <Badge badgeContent={quantity} color='primary'>
                <CiShoppingCart
                  style={{
                    color: "black",
                    fontSize: "25px",
                  }}
                />
              </Badge>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
