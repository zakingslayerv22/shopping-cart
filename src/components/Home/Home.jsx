import { Link, Outlet } from "react-router";
import styles from "./Home.module.css";

const Home = () => {
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

      <Outlet />
    </>
  );
};

export default Home;
