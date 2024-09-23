import { useCartSelector } from "../store/hooks";
const CartItems = () => {
  const { items, totalAmount } = useCartSelector((state) => state.cart);
  const formattedTotalAmount = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <div id="cart">
      {!!items.length ? (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span>({formattedPrice})</span>
                  <span> &times; {item.quantity}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Cart is currently empty!</p>
      )}

      <p>Total: {formattedTotalAmount}</p>
    </div>
  );
};

export default CartItems;
