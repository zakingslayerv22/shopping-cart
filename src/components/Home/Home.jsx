import { useState, useEffect } from "react";

import { Link, Outlet } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
  const [productsList, setProductsList] = useState(null);

  useEffect(() => {
    console.log("fetching");
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
          totalPriceInCart: 0,
        }));

        setProductsList(productsWithQuantities);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const cartItemsTotal = productsList
    ? productsList.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.quantityInCart,
        0
      )
    : 0;

  const handleQuantityChange = (productId, action, field) => {
    setProductsList((previousList) =>
      previousList.map((product) => {
        if (product.id !== productId) return product;

        const delta = action === "increment" ? 1 : -1;

        return {
          ...product,
          [field]: Math.max(0, Number(product[field]) + delta),
        };
      })
    );
  };

  const handleQuantityInput = ({ target }, productId) => {
    const { value } = target;

    setProductsList((previousList) =>
      previousList.map((product) => {
        if (product.id !== productId) return product;

        return {
          ...product,
          quantitySelected: value,
        };
      })
    );

    console.log(value);
  };

  const handleAddToCart = (productId) => {
    setProductsList((previousList) =>
      previousList.map((product) => {
        if (product.id !== productId) return product;

        return {
          ...product,
          quantityInCart:
            Number(product.quantitySelected) + product.quantityInCart,
        };
      })
    );
  };

  return (
    <>
      {console.log(productsList)}
      <Link to="/">
        {" "}
        <h2>Shopping Cart Home</h2>
      </Link>
      <nav className={styles.nav}>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart ({cartItemsTotal} items)</Link>
      </nav>
      <hr />

      <Outlet
        context={{
          productsList,
          handleQuantityChange,
          handleQuantityInput,
          handleAddToCart,
        }}
      />
    </>
  );
};

export default Home;
