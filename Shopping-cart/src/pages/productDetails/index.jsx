import { useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetailsPages(){
    const{id}=useParams();
    const{
        productdetails,
        setProductDetails,
        loading,setLoading,
        handleAddToCart,
        cartItems,

    }=useContext(ShoppingCartContext);

    async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  //fetchProductDetails();
  console.log(productdetails);



    return(

       <div>
         <div className=" max-w-4xl lg:max-w-7xl p-6  mx-auto">
            <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
                <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                    <div className="px-4 py-10 rounded-xl shadow-lg relative">
                        <img  className="w-4/5 rounded object-cover" src={productdetails?.thumbnail} alt={productdetails?.title} />

                    </div>
                    <div>
                        {
                            productdetails?.images?.length?
                            productdetails?.images.map((imageItem)=>(
                                <div className="rounded-xl p-4 shadow-md "key={imageItem}>
                                    <img
                                        src={imageItem}
                                        className="w-24 cursor-pointer"
                                        alt="Product secondary image"
                                    />
                                 </div>

                            
                            ))
                            :null}
                    </div>
                    
                </div>
                <div className="lg:col-span-2 ">
                    <div className="text-2xl font-extrabold " >
                        {productdetails?.title}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <p className="text-xl font-bold">Price: ${productdetails?.price}</p>
                    </div>
                    <button
                        disabled={
                        productdetails
                            ? cartItems.findIndex(
                                (item) => item.id === productdetails.id
                            ) > -1
                            : false
                        }
                        onClick={() => handleAddToCart(productdetails)}
                        className="disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded"
                    >
                        Add to Cart
                    </button>
                    
                </div>



            </div>
            <div>

            </div>

         </div>
       </div>
    )
}
export default ProductDetailsPages;