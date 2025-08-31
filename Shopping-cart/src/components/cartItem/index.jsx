import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";


function CartTitle({singleCartItem}){
    const {handleRemoveFromCart,handleAddToCart}=useContext(ShoppingCartContext);
    return(
        <Fragment>
            <div className="grid grid-cols-3 item-start gap-5 shadow-sm p-2 mx-2">
                <div className="col-span-2 flex itmes-start gap-4 ">
                    <div className="w-28 h-28 max-sw:w-20 shrink-0 bg-grey-400 p-1 rounded-sm">
                        <img src={singleCartItem?.thumbnail} alt={singleCartItem?.title} className="w-full h-full object-contain"/>

                    </div>
                    <div >
                        <h3 className="text-base font-bold text-grey-800">{singleCartItem?.title}</h3>
                        <button onClick={()=>handleRemoveFromCart(singleCartItem,true)} className="text-sm px-4 py-2 bg-black text-white font-extrabold">Remove</button>


                    </div>
                    

                </div>
                <div className="ml-auto ">
                    <h3 className="text-lg font-bold text-gray-900">
                        ${singleCartItem?.totalPrice.toFixed(2)}
                    </h3>
                    <p className="mt-2 mb-3 font-bolf text-[16px]">
                        Quantity: {singleCartItem?.quantity}
                    </p>
                    <div className="mt-3  ">
                        <button
                            onClick={() => handleRemoveFromCart(singleCartItem, false)}
                            className="disabled:opacity-65 border border-[#000] mx-2 p-2"
                            disabled={singleCartItem?.quantity === 1}
                        >
                            -
                        </button>
                        <button
                            onClick={() => handleAddToCart(singleCartItem)}
                            className="border border-[#000] p-2"
                            >
                            +
                        </button>

                </div>

            </div>
            </div>
        </Fragment>
    )



}
export default CartTitle;