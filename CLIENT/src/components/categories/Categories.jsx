import "./index.css";
// import { categoryItems } from "../../data/data";
import CategoryItem from "./CategoryItem";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useGetCategories } from "../../hooks/useGetCategories";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Categories = (props, ref) => {
  const { categories } = useGetCategories();
  const [transLate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef(null);
  const viewWidth = containerRef.current?.clientWidth;
  const totalWidth = containerRef.current?.scrollWidth;

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver(entries => {
      const container = entries[0].target;
      if (container == null) return;
      setIsLeftVisible(transLate > 0);
      setIsRightVisible(
        transLate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [transLate, categories]);

  const handleClickLeft = () => {
    const newTranslate = transLate - viewWidth;
    setTranslate(newTranslate <= 0 ? 0 : newTranslate);
  };

  const handleClickRight = () => {
    const newTranslate = transLate + viewWidth;
    setTranslate(
      newTranslate + viewWidth >= totalWidth
        ? totalWidth - viewWidth
        : newTranslate
    );
  };

  return (
    <section ref={ref} id='categories' className='categories'>
      <h1 className='title'>CATEGORIES</h1>
      <div
        ref={containerRef}
        className='categoryItems'
        style={{ translate: `${-transLate}px` }}>
        {categories.map(cat => (
          <CategoryItem cat={cat} key={cat._id} />
        ))}
      </div>
      {isLeftVisible && (
        <span className='arrow' id='left-arrow' onClick={handleClickLeft}>
          <ArrowBackIosRoundedIcon />
        </span>
      )}
      {isRightVisible && (
        <span className='arrow' id='right-arrow' onClick={handleClickRight}>
          <ArrowForwardIosRoundedIcon />
        </span>
      )}
    </section>
  );
};

export default forwardRef(Categories);
