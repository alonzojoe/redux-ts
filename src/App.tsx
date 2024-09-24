import { useEffect, useState } from "react";
import { useCartDispatch, useCartSelector } from "./store/hooks";
import { fetchProducts } from "./store/thunks/posts";

import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Pagination from "./components/Pagination";

function App() {
  const dispatch = useCartDispatch();
  const { items, isLoading, isError } = useCartSelector((state) => state.cart);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 60;

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    dispatch(fetchProducts({ offset, limit: itemsPerPage }));
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

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
        <Pagination
          totalPages={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      </Shop>
    </>
  );
}

export default App;
