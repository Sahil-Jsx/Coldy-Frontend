import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Customers from "./pages/customers/customers";
import Add_Customer from "./pages/customers/add/add-customers";
import Edit_Customer from "./pages/customers/edit/edit-customer";
import Places from "./pages/places/places";
import Add_Place from "./pages/places/add/add-place";
import Orders from "./pages/orders/orders";
import Products from "./pages/products/products";
import Add_Products from "./pages/products/add/add-product";
import Add_Orders from "./pages/orders/add/add-order";
import { Toaster } from "react-hot-toast";
import Edit_Place from "./pages/places/edit/edit-place";
import Edit_Product from "./pages/products/edit/edit-product";
import Edit_Orders from "./pages/orders/edit/edit-order";
import Loader from "./components/loader/loader";
import instance from "./services/token-interceptor";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //request interceptor
    instance.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    //response interceptor
    instance.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Loader show={loading} />
          <Toaster />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* auth */}
            <Route path="/login" element={<Login />} />

            {/* customers */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/add" element={<Add_Customer />} />
            <Route path="/customers/:id" element={<Edit_Customer />} />

            {/* places */}
            <Route path="/places" element={<Places />} />
            <Route path="/places/add" element={<Add_Place />} />
            <Route path="/places/:id" element={<Edit_Place />} />

            {/* order */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/add" element={<Add_Orders />} />
            <Route path="/orders/:id" element={<Edit_Orders />} />

            {/* products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<Add_Products />} />
            <Route path="/products/:id" element={<Edit_Product />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
