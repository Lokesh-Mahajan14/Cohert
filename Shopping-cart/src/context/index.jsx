import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
export const ShoppingCartContext=createContext(null);

function ShoppingCartProvider({children}){

    const[loading,setLoading]=useState(true);
    const[listofProducts,setListofProduct]=useState([]);
    const[productdetails ,setProductDetails]=useState([]);
      const [cartItems, setCartItems] = useState([]);
      const navigate = useNavigate();



    async function fetchList(){
        const data=await fetch('https://dummyjson.com/products');
        const result=await data.json();
        if (result && result?.products) {
            setListofProduct(result?.products);
            setLoading(false);
    }
        
    }
    function handleAddToCart(getProductDetails){
        console.log(getProductDetails);
        let cpyExitingCartItems=[...cartItems];
        const findIndexofCurrentItem=cpyExitingCartItems.findIndex(
            (cartItems)=>cartItems.id===getProductDetails.id
        );

        if(findIndexofCurrentItem===-1){
            cpyExitingCartItems.push({
                ...getProductDetails,
                quantity:1,
                totalPrice:getProductDetails?.price
            });

        }else{
            console.log("its coming here");
            cpyExitingCartItems[findIndexofCurrentItem] = {
                ...cpyExitingCartItems[findIndexofCurrentItem],
                quantity: cpyExitingCartItems[findIndexofCurrentItem].quantity + 1,
                totalPrice:
                (cpyExitingCartItems[findIndexofCurrentItem].quantity + 1) *
                cpyExitingCartItems[findIndexofCurrentItem].price,
            };
        }
            setCartItems(cpyExitingCartItems);
          
            localStorage.setItem("cartItems", JSON.stringify(cpyExitingCartItems));
            navigate("/cart");

    }
    function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = cpyExistingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );

    if (isFullyRemoveFromCart) {
      cpyExistingCartItems.splice(findIndexOfCurrentCartItem, 1);
    } else {
      cpyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentCartItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1) *
          cpyExistingCartItems[findIndexOfCurrentCartItem].price,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
  

    }

useEffect(() => {
    fetchList();
    try {
        const savedItems = localStorage.getItem("cartItems");
        setCartItems(savedItems ? JSON.parse(savedItems) : []);
    } catch (error) {
        console.error("Failed to parse cartItems:", error);
        setCartItems([]);
    }
}, []);



    


    return (
    <ShoppingCartContext.Provider value={{listofProducts,loading,setLoading,productdetails,setProductDetails,handleAddToCart,
        cartItems,handleRemoveFromCart}}>{children}</ShoppingCartContext.Provider>
    );
}
export default ShoppingCartProvider;