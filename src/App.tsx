import { useEffect, useState } from "react";
import { getData } from "./libs/http";
import { Products } from "./libs/types";

import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getData<Products[]>(
          `https://api.escuelajs.co/api/v1/products`
        );
        setProducts(data);
        console.log(data[0].title);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Shop>
        {products.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
        {/* {error ? (
          <p>{error}</p>
        ) : isLoading ? (
          <p>Loading....</p>
        ) : (
          <pre>{JSON.stringify(products)}</pre>
        )} */}
      </Shop>
    </>
  );
}

export default App;
