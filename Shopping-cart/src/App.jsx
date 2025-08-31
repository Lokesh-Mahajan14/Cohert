import { Fragment } from "react"
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/productList"
import ProductDetailsPages from "./pages/productDetails"
import CartList from "./pages/cartList"

function App() {

  return (

    <Fragment>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetailsPages />} />
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </Fragment>
    
  )
}

export default App
