import { type ReactNode } from "react";

const Shop = ({ children }: { children: ReactNode }) => {
  return (
    <section id="shop">
      <h2>Shopping Store for Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  );
};

export default Shop;
