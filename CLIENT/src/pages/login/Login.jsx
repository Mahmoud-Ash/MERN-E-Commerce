import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../../features/userSlice";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { isFetching, error } = useSelector(state => state.user);
  const userRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
    userRef.current.focus();
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <section className='login-page'>
      <div className='login-container'>
        <h1 className='title'>SIGN IN</h1>
        <form id='login-form'>
          <input
            ref={userRef}
            type='text'
            name='username'
            placeholder='User Name'
            required
            onChange={e => {
              dispatch(clearError());
              setUsername(e.target.value);
            }}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            onChange={e => {
              dispatch(clearError());
              setPassword(e.target.value);
            }}
          />
          <button
            disabled={isFetching || !username || !password}
            className={
              isFetching || !username || !password ? "disabled" : "enabled"
            }
            onClick={handleClick}>
            SIGN IN
          </button>
          <button type='button' id='btn-guest' className='enabled '>
            <Link to={"/"} style={{ all: "unset" }}>
              CONTINUE AS GUEST
            </Link>
          </button>
          {error && (
            <p
              style={{
                color: "red",
              }}>
              Invalid user name or passwsord !!
            </p>
          )}
          <Link>Forgot password? </Link>
          <p>
            Don&apos;t have an account{" "}
            <Link to={"/register"}>Register Now</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
