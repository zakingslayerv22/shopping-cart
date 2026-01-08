import { useEffect } from "react";
import { Link } from "react-router";
import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";

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
        // console.log(productsWithQuantities);
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
      <section className={styles.productsContainer}>
        {productsList.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.descriptionContainer}>
              <div>
                {" "}
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.cardImage}
                />
              </div>
              <p>{product.title}</p>
              <p>
                <strong>${product.price}</strong>
              </p>
            </div>
            <div className={styles.cardControls}>
              <button
                onClick={() => handleQuantityChange(product.id, "increment")}
              >
                +
              </button>
              <input
                type="number"
                value={product.quantitySelected}
                onChange={(event) => handleQuantityInput(event, product.id)}
              />
              <button
                data-id={product.id}
                onClick={() => handleQuantityChange(product.id, "decrement")}
              >
                -
              </button>
              <button onClick={() => handleAddToCart(product.id)}>Cart</button>
            </div>
          </div>
        ))}
      </section>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Shop;
