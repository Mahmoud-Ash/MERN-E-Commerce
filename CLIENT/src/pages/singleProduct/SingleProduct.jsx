import { Add, Remove } from "@mui/icons-material";
import "./index.css";
import { Link, useParams } from "react-router-dom";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useProductParams } from "../../hooks/useProductParams";

const SingleProduct = () => {
  const { id } = useParams();
  const product = useGetProduct(id);
  const { setSearchParams, color, size, quantity } = useProductParams(product);
  const { alert, handleClick } = useAddToCart(color, size, quantity, product);

  return (
    <div className='single-product'>
      {product && (
        <>
          <div className='image-container'>
            <img src={product.image} alt='product' />
          </div>
          <div className='info-container'>
            <h1 className='title'>{product.name}</h1>
            <p className='desc'>{product.description}</p>
            <span className='price'>$ {product.price}</span>
            <div className='filter-container'>
              <div className='filter'>
                <span>Color:</span>
                {product?.colors.map(c => (
                  <div
                    className='color'
                    style={{
                      backgroundColor: `${c.toLowerCase()}`,
                      border: color === c && "solid 1px black",
                      scale: color === c && "1.2",
                    }}
                    key={c}
                    onClick={() =>
                      setSearchParams(
                        prev => {
                          prev.set("color", c);
                          return prev;
                        },
                        { replace: true }
                      )
                    }
                  />
                ))}
              </div>
              <div className='filter'>
                <span>Size:</span>
                <select
                  value={size || ""}
                  onChange={e =>
                    setSearchParams(
                      prev => {
                        prev.set("size", e.target.value);
                        return prev;
                      },
                      { replace: true }
                    )
                  }>
                  <option value='undefined'>size</option>
                  {product.sizes?.map(s => (
                    <option size={s} key={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='add-container'>
              <div className='amount-container'>
                <i>
                  <Remove
                    onClick={() =>
                      setSearchParams(
                        prev => {
                          prev.set(
                            "quantity",
                            quantity > 1 ? quantity - 1 : quantity
                          );
                          return prev;
                        },
                        { replace: true }
                      )
                    }
                  />
                </i>
                <span id='quantity'>{quantity}</span>
                <i>
                  <Add
                    onClick={() =>
                      setSearchParams(
                        prev => {
                          prev.set("quantity", quantity + 1);
                          return prev;
                        },
                        { replace: true }
                      )
                    }
                  />
                </i>
              </div>
              <button onClick={handleClick}>ADD TO CART</button>
            </div>
            <p className='alert' style={{ display: !alert && "none" }}>
              Select Color and Size to Purchase
            </p>
          </div>
        </>
      )}
      {!product && (
        <section
          style={{
            width: "100%",
            textAlign: "center",
            margin: "auto",
          }}>
          <h2>Product Not Found</h2>
          <p>
            <Link to='/'>Go back to home page</Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default SingleProduct;
