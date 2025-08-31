import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductTile({ singleProductTile }) {
  const navigate = useNavigate();
  const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);

  function handleNavigateToProductDetailsPage(getCurrentProductId) {
    navigate(`/product-details/${getCurrentProductId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={singleProductTile?.thumbnail}
          alt={singleProductTile?.title}
          className="oject-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProductTile?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
            ${singleProductTile?.price}
          </p>
        </div>
      </div>
      <button className="mt-4 px-5 py-2 text-white font-bold text-lg rounded-none bg-black border mx-auto w-full cursor-pointer" onClick={()=>handleNavigateToProductDetailsPage(singleProductTile?.id)}>View Details</button>
      
    </div>
  );
}

export default ProductTile;