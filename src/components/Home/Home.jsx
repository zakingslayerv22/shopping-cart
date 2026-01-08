import { useState, useCallback } from "react";

import { Link, Outlet } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
  const [productsList, setProductsList] = useState(null);

  const cartItemsTotal = productsList
    ? productsList.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.quantityInCart,
        0
      )
    : 0;

  const handleProductsList = useCallback((productsArray) => {
    setProductsList(productsArray);
  }, []);

  const handleQuantityChange = (productId, action) => {
    setProductsList((previousList) =>
      previousList.map((product) => {
        if (product.id !== productId) return product;

        const delta = action === "increment" ? 1 : -1;

        return {
          ...product,
          quantitySelected: Math.max(
            0,
            Number(product.quantitySelected) + delta
          ),
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
          handleProductsList,
          handleQuantityChange,
          handleQuantityInput,
          handleAddToCart,
        }}
      />
    </>
  );
};

export default Home;
