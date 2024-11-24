/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./index.css";

const CategoryItem = ({ cat }) => {
  return (
    <div className='categoryItem'>
      <img src={cat.image} alt={cat.imageDescription} />
      <div className='categoryInfo'>
        <h1> {cat.name} </h1>
        <p className='desc'>{cat.description}</p>
        <Link to={`/products/${cat.name}`}>
          <button>SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
