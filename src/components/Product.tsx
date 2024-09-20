import { Products as ProductProps } from "../libs/types";

const Product = ({ images, title, description, price }: ProductProps) => {
  const addToCart = () => {};

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
          <button onClick={addToCart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
};

export default Product;
