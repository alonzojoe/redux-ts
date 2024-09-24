import { useEffect, useState } from "react";
import { useCartDispatch, useCartSelector } from "./store/hooks";
import { fetchProducts } from "./store/thunks/posts";

import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";

function App() {
  const dispatch = useCartDispatch();
  const { items, isLoading, isError } = useCartSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Header />
      <Shop>
        {isError ? (
          <p style={{ color: "red" }}>{isError}</p>
        ) : isLoading ? (
          <p>Loading Products....</p>
        ) : (
          items.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))
        )}
      </Shop>
    </>
  );
}

export default App;
