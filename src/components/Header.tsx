import { useState } from "react";
import Cart from "./Cart";
import logo from "../assets/logo.png";

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && <Cart onClose={() => setVisible(false)} />}
      <header id="main-header">
        <div id="main-title">
          <img src={logo} alt="Shop Logo" />
          <h1>Redux Shopping Store</h1>
        </div>
        <p>
          <button onClick={() => setVisible(true)}>Cart (0)</button>
        </p>
      </header>
    </>
  );
};

export default Header;
