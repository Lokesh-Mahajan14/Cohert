import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import CartTitle from "../../components/cartItem";

function CartList(){


    const{cartItems}=useContext(ShoppingCartContext);
    const navigate=useNavigate();


    return(
        <div className="max-w-7xl max-md:max-w-xl mx-auto py-4">
            <h1 className="text-2xl font-bold text-grey-800 text-center">My Cart Page</h1>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                {
                    cartItems?.length ? (
                        cartItems.map((singleCartItem) => (
                        <CartTitle singleCartItem={singleCartItem} />
                        ))
                    ) : (
                        <h1>No items available in cart!Please add some items</h1>
                    )

                }

            </div>
        </div>
    )
}
export default CartList;