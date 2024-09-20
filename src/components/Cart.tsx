import { createPortal } from "react-dom";
import CartItems from "./CartItems";

type CartProps = {
  onClose: () => void;
};

const Cart = ({ onClose }: CartProps) => {
  return createPortal(
    <>
      <div className="cart-backdrop">
        <dialog id="cart-modal" open>
          <CartItems />
          <p id="cart-actions">
            <button onClick={onClose}>Close</button>
          </p>
        </dialog>
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default Cart;
