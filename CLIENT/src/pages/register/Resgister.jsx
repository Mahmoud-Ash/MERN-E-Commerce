import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faCircleInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;

const Resgister = () => {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [cPwd, setCPwd] = useState("");
  const [validCPwd, setValidCPwd] = useState(false);
  const [cPwdFocus, setCPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const userRef = useRef("");
  const errRef = useRef("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidCPwd(pwd === cPwd);
  }, [pwd, cPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, cPwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const res = await axios.post("/auth/register", {
        username: user,
        email,
        password: pwd,
      });
      console.log(res);
      setSuccess(true);
    } catch (err) {
      !err?.response
        ? setErrMsg("No server response")
        : err.response?.status === 500
        ? setErrMsg("You already have an account")
        : setErrMsg("Registration failed");
      errRef.current.focus();
    }
  };

  return (
    <main className='register-page'>
      {success ? (
        <section className='success'>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"} className='login'>
              Sign-In
            </Link>
          </p>
        </section>
      ) : (
        <section className='register-container'>
          <h1 className='title'>CREATE AN ACCOUNT</h1>
          <p
            ref={errRef}
            className={errMsg ? "err-msg" : "offscreen"}
            aria-live='assertive'>
            {errMsg}
          </p>
          <form id='register-form' onSubmit={handleSubmit}>
            <div className='input'>
              <input
                placeholder='User Name'
                type='text'
                autoComplete='off'
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                ref={userRef}
                onChange={e => setUser(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                className={!validName ? "offscreen" : "valid"}
                style={{ color: "teal" }}
              />
              <FontAwesomeIcon
                icon={faXmark}
                beat
                style={{ color: "#ff0000" }}
                className={!user || validName ? "offscreen" : "valid"}
              />
              <p
                id='uidnote'
                className={
                  userFocus && !validName && user ? "instructions" : "offscreen"
                }>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ marginRight: "5px" }}
                />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores and hyphens allowed.
              </p>
            </div>
            <div className='input'>
              <input
                type='email'
                autoComplete='off'
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailnote'
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "teal" }}
                className={!validEmail ? "offscreen" : "valid"}
              />
              <FontAwesomeIcon
                icon={faXmark}
                beat
                style={{ color: "#ff0000" }}
                className={!email || validEmail ? "offscreen" : "valid"}
              />
              <p
                id='emailnote'
                className={
                  email && emailFocus && !validEmail
                    ? "instructions"
                    : "offscreen"
                }>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ marginRight: "5px" }}
                />
                E-mail must be valid
              </p>
            </div>
            <div className='input'>
              <input
                placeholder='Password'
                type='password'
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby='pwdnote'
                onChange={e => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "teal" }}
                className={!validPwd ? "offscreen" : "valid"}
              />
              <FontAwesomeIcon
                icon={faXmark}
                beat
                style={{ color: "#ff0000" }}
                className={!pwd || validPwd ? "offscreen" : "valid"}
              />
              <p
                id='pwdnote'
                className={
                  pwd && pwdFocus && !validPwd ? "instructions" : "offscreen"
                }>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ marginRight: "5px" }}
                />
                8 to 24 characters. <br />
                Must include uppercase and lower case letters, a number and a
                special character. <br />
                Allowed special characters:{" "}
                <span aria-label='at symbol'>@</span>
                <span aria-label='exclamation mark'>!</span>
                <span aria-label='at symbol'>@</span>
                <span aria-label='hashtag'>#</span>
                <span aria-label='dollar sign'>$</span>
                <span aria-label='percent'>%</span>
              </p>
            </div>
            <div className='input'>
              <input
                placeholder='Confirm Password'
                type='password'
                required
                aria-invalid={validCPwd ? false : true}
                aria-describedby='cpwdnote'
                onChange={e => setCPwd(e.target.value)}
                onFocus={() => setCPwdFocus(true)}
                onBlur={() => setCPwdFocus(false)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "teal" }}
                className={!cPwd || !validCPwd ? "offscreen" : "valid"}
              />
              <FontAwesomeIcon
                icon={faXmark}
                beat
                style={{ color: "#ff0000" }}
                className={!cPwd || validCPwd ? "offscreen" : "valid"}
              />
              <p
                id='cpwdnote'
                className={
                  cPwd && cPwdFocus && !validCPwd ? "instructions" : "offscreen"
                }>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ marginRight: "5px" }}
                />
                Must match the first passweord input field.
              </p>
            </div>
            <span id='agreement'>
              By creating an account, I consent to the proccessing of my
              personal data in accordance with the <b>PRIVACY POLICY.</b>
            </span>
            <button
              type='submit'
              className={
                !validCPwd || !validEmail || !validName || !validPwd
                  ? "disabled"
                  : "enabled"
              }>
              REGISTER
            </button>
            <button type='button' id='btn-guest' className='enabled '>
              <Link to={"/"} style={{ all: "unset" }}>
                CONTINUE AS GUEST
              </Link>
            </button>
            <span style={{ fontSize: "14px" }}>
              Already registered? <br />
              <Link to={"/login"}>Sign-in</Link>
            </span>
          </form>
        </section>
      )}
    </main>
  );
};

export default Resgister;
