import { useCartSelector } from "../store/hooks";
import { useCartDispatch } from "../store/hooks";
import { addToCart, removeToCart } from "../store/slices/cart-slice";
const CartItems = () => {
  const { items, totalAmount } = useCartSelector((state) => state.cart);
  const dispatch = useCartDispatch();

  const formattedTotalAmount = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const increaseQuantity = (payload: {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
  }) => {
    dispatch(addToCart({ ...payload, quantity: 1 }));
  };

  const decreaseQuantity = (id: number) => {
    dispatch(removeToCart({ id }));
  };

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
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>&times;{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
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
