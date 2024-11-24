import "./index.css";
import {
  EmailOutlined,
  Facebook,
  Instagram,
  LocationOn,
  PhoneIphone,
  Pinterest,
  X,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <section className='left'>
        <h1 className='logo'>ASH.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          iaculis mauris at ipsum faucibus pretium. Vestibulum at risus eu nibh
          sodales fermentum. Duis odio lectus, molestie sed sagittis et,
          pellentesque quis lectus. Sed dictum lobortis ex rutrum tincidunt.
          Nulla.
        </p>
        <div className='iconsContainer'>
          <i style={{ backgroundColor: "#3b5999" }}>
            <Facebook />
          </i>
          <i style={{ backgroundColor: "#e4405f" }}>
            <Instagram />
          </i>
          <i style={{ backgroundColor: "#000" }}>
            <X />
          </i>
          <i style={{ backgroundColor: "#e60023" }}>
            <Pinterest />
          </i>
        </div>
      </section>
      <section className='center'>
        <h3>Useful Links</h3>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Men Fashin</li>
          <li>Women Fashion</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Wishlist</li>
          <li>About</li>
          <li>Terms</li>
        </ul>
      </section>
      <section className='right'>
        <h1>Contact</h1>
        <div className='contactItem'>
          <LocationOn style={{ marginRight: "20px" }} />
          <p>Port Said, Egypt</p>
        </div>
        <div className='contactItem'>
          <PhoneIphone style={{ marginRight: "20px" }} />
          <p>+20 1020304050</p>
        </div>
        <div className='contactItem'>
          <EmailOutlined style={{ marginRight: "20px" }} />
          <p>Mahmoudashraf.civil@gmail.com</p>
        </div>
        <img
          className='payment'
          src='https://i.ibb.co/Qfvn4z6/payment.png'
          alt='payment methods'
        />
      </section>
    </footer>
  );
};

export default Footer;
