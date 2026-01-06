import { useState, useCallback } from "react";

import { Link, Outlet } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
  const [productsList, setProductsList] = useState(null);

  const handleProductsList = useCallback((productsArray) => {
    setProductsList(productsArray);
  }, []);

  const handleQuantityChange = ({ target }) => {
    console.log(target);
  };

  const handleQuantityInput = ({ target }) => {
    console.log(target);
  };

  const handleAddToCart = ({ target }) => {
    console.log(target);
  };

  return (
    <>
      <Link to="/">
        {" "}
        <h2>Shopping Cart Home</h2>
      </Link>
      <nav className={styles.nav}>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart (0 items)</Link>
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
