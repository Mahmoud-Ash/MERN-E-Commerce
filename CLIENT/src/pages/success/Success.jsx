import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "1.5rem",
        fontWeight: "500",
        textAlign: "center",
      }}>
      <span
        style={{
          padding: "20px",
          backgroundColor: "teal",
          color: "white",
          borderRadius: "6px",
        }}>
        Successfull
      </span>
      <span>
        Your order is being prepared. Thanks for <br />
        choosing our shop.
      </span>
      <Link to={"/"} style={{ all: "unset", cursor: "pointer", color: "teal" }}>
        Go back to home page...
      </Link>
    </div>
  );
}

export default Success;
