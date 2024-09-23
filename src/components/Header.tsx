import { useState } from "react";
import { useCartSelector } from "../store/hooks";
import Cart from "./Cart";
import logo from "../assets/logo.png";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const cartLength = useCartSelector((state) =>
    state.cart.items.reduce((value, current) => {
      return value + current.quantity;
    }, 0)
  );

  return (
    <>
      {visible && <Cart onClose={() => setVisible(false)} />}
      <header id="main-header">
        <div id="main-title">
          <img src={logo} alt="Shop Logo" />
          <h1>Redux Shopping Store</h1>
        </div>
        <p>
          <button onClick={() => setVisible(true)}>Cart ({cartLength})</button>
        </p>
      </header>
    </>
  );
};

export default Header;
