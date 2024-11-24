import "./index.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { forwardRef, useState } from "react";
import { sliderItems } from "../../assets/data";
import Slide from "./Slide";

const Slider = (props, ref) => {
  const [transValue, setTransValue] = useState(0);

  const handleClickRight = () => {
    transValue > -200 && setTransValue(prev => prev - 100);
  };

  const handleClickLeft = () => {
    transValue < 0 && setTransValue(prev => prev + 100);
  };
  return (
    <section className='slider-container'>
      <span className='arrow' id='left-arrow' onClick={handleClickLeft}>
        <ArrowBackIosRoundedIcon />
      </span>
      <span className='arrow' id='right-arrow' onClick={handleClickRight}>
        <ArrowForwardIosRoundedIcon />
      </span>
      <div className='slide-container' style={{ translate: `${transValue}vw` }}>
        {sliderItems.map(item => (
          <Slide item={item} key={item.id} ref={ref} />
        ))}
      </div>
    </section>
  );
};

export default forwardRef(Slider);
