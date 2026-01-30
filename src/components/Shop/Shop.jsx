import { Link } from "react-router";
import { useOutletContext } from "react-router";
import styles from "./Shop.module.css";

const Shop = () => {
  const {
    productsList,
    handleQuantityChange,
    handleQuantityInput,
    updateCartQuantity,
  } = useOutletContext();

  if (!productsList) {
    return <h3>fetching products...</h3>;
  }

  return (
    <div>
      <h3>This is shop.</h3>
      <section className={styles.productsContainer}>
        {productsList.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.descriptionContainer}>
              <div>
                {" "}
                <img
                  src={product.images[0]}
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
                onClick={() =>
                  handleQuantityChange(
                    product.id,
                    "increment",
                    "quantitySelected"
                  )
                }
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
                onClick={() =>
                  handleQuantityChange(
                    product.id,
                    "decrement",
                    "quantitySelected"
                  )
                }
              >
                -
              </button>
              <button
                onClick={() => updateCartQuantity(product.id, "add")}
                disabled={!product.quantitySelected}
              >
                Cart
              </button>
            </div>
          </div>
        ))}
      </section>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Shop;
