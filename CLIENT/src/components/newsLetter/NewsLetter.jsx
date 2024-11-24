import './index.css'
import { SendOutlined } from "@mui/icons-material"

const NewsLetter = () => {
    return (
        <section className="newsLetter">
            <h1>Newsletter</h1>
            <p>Get timely updates from your favorite products.</p>
            <div className="input-container">
                <input type="email" placeholder="Your E-mail" />
                <button><SendOutlined /> </button>
            </div>
        </section>
    )
}

export default NewsLetter