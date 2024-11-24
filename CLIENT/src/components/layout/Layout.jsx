import { Outlet } from "react-router-dom";
import Announcement from "../announcement/Announcement";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import NewsLetter from "../newsLetter/NewsLetter";

const Layout = () => {
    return (
        <main className="App">
            <Announcement />
            <Navbar />
            <Outlet />
            <NewsLetter />
            <Footer />
        </main>
    );
};

export default Layout;
