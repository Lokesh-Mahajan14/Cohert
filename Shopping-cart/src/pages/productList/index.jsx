import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";

function ProductList() {
  const { listofProducts, loading } = useContext(ShoppingCartContext);

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        type="button"
        className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center"
        disabled
      >
        <svg
          className="mr-3 w-5 h-5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Processing…
      </button>
    </div>
  );
}




  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listofProducts && listofProducts.length > 0 ? (
            listofProducts.map((singleProductTile) => (
              <ProductTile singleProductTile={singleProductTile} />
            ))
          ) : (
            <h3>No Products Found</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;