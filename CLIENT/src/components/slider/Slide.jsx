/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import "./index.css";

const Slide = ({ item }, ref) => {
  return (
    <div className='slide' style={{ backgroundColor: item.bg }}>
      <div className='image'>
        <img src={item.img} alt={item.imgDesc} />
      </div>
      <div className='info'>
        <h1 className='title'>{item.title}</h1>
        <p className='desc'>{item.desc}</p>
        <div>
          <button
            onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}>
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Slide);
