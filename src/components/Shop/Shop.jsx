import { useEffect } from "react";
import { Link } from "react-router";
import { useOutletContext } from "react-router";

const Shop = () => {
  const {
    productsList,
    handleProductsList,
    handleQuantityChange,
    handleQuantityInput,
    handleAddToCart,
  } = useOutletContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(
          "https://fakestoreapi.com/products",
          { mode: "cors" }
        );

        if (!productsResponse.ok) {
          throw new Error(`Error fetching species: ${productsResponse.status}`);
        }

        const allProducts = await await productsResponse.json();

        const productsWithQuantities = allProducts.map((product) => ({
          ...product,
          quantitySelected: 0,
          quantityInCart: 0,
        }));

        handleProductsList(productsWithQuantities);
        console.log(productsWithQuantities);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, [handleProductsList]);

  if (!productsList) {
    return <h1>fetching products...</h1>;
  }

  return (
    <div>
      <h3>Hello I am Shop. Welcome to Shop</h3>
      {productsList.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Shop;
