import { Products as ProductProps } from "../libs/types";
import { addToCart } from "../store/slices/cart-slice";
import { useCartDispatch } from "../store/hooks";

const Product = ({
  id,
  images = [""],
  title,
  description,
  price,
}: ProductProps) => {
  const dispatch = useCartDispatch();

  const addItem = () => {
    dispatch(
      addToCart({
        id,
        title,
        description,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <article className="product">
      <img src={images[0]} alt={title} />
      <div className="product-content">
        <>
          <h2>{title}</h2>
          <p className="product-price">₱{price}</p>
          <p>{description}</p>
        </>
        <p className="product-actions">
          <button onClick={addItem}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
};

export default Product;
