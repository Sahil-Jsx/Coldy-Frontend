import React, { useEffect, useState } from "react";
import Components from "../../components/components";
import Speed_Dial from "../../components/speed-dial/speed-dial";
import Backbutton from "../../components/back/back";
import {
  delete_product,
  get_products,
  search_product,
} from "../../services/product";
import ProductIcon from "../../assets/svgs/product";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const actions = [
    {
      icon: <Components.Icons.Add />,
      name: "Add New",
      path: "products/add",
    },
  ];

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await get_products();
      setProducts(data);
    } catch (error) {
      toast.error("Error fetching products");
      console.error("Error fetching products:", error);
    }
  };

  const editButtonClick = (id) => {
    navigate(`/products/${id}`);
  };

  const deleteButtonClick = (id) => {
    delete_product(id)
      .then((res) => {
        console.log(res.data);
        toast.success("Product Deleted Successfully");
        getProducts();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error deleting product");
      });
  };

  const searchProduct = (value) => {
    search_product(value)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        toast.error("Server Error");
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <Backbutton />
          </div>
          <div>
            <span className="font-semibold text-xl">Products</span>
          </div>
          <div></div>
        </div>
        {/* search */}
        <div className="w-full mt-3">
          <Components.TextField
            variant="outlined"
            className="w-full"
            size="small"
            placeholder="Search"
            onChange={(event) => {
              const value = event.target.value;
              searchProduct(value);
            }}
          />
        </div>
        {/* main section */}
        <section className="w-full">
          <div className="pb-20 mt-5">
            {products.length === 0 ? (
              <p className="text-center mt-5">No Products found.</p>
            ) : (
              products.map((product, index) => (
                <Components.Accordion key={index} className="mb-3">
                  <Components.AccordionSummary
                    expandIcon={<Components.Icons.KeyboardArrowDownRounded />}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start">
                        <div>
                          <ProductIcon height="40px" width="40px" />
                        </div>
                        <div className="flex flex-col ms-3">
                          <span className="font-semibold capitalize">
                            {product.product_name}
                          </span>
                          <span className="font-semibold text-dull capitalize">
                            ₹ {product.product_price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Components.AccordionSummary>
                  <Components.AccordionDetails>
                    <div>
                      <p className="font-semibold mt-2">Product Name:</p>
                      <p>{product.product_name}</p>
                      <p className="font-semibold mt-2">Product Price:</p>
                      <p>₹ {product.product_price}</p>
                    </div>
                  </Components.AccordionDetails>
                  <hr />
                  <Components.AccordionActions>
                    <div className="flex justify-between w-full mx-5">
                      <div onClick={() => editButtonClick(product._id)}>
                        <Components.Icons.Edit fontSize="medium" />
                      </div>
                      <div
                        className="text-red-600"
                        onClick={() => deleteButtonClick(product._id)}
                      >
                        <Components.Icons.DeleteOutlineRounded />
                      </div>
                    </div>
                  </Components.AccordionActions>
                </Components.Accordion>
              ))
            )}
          </div>
        </section>
        {/* speed dial */}
        <div>
          <Speed_Dial actions={actions} />
        </div>
      </section>
    </>
  );
};

export default Products;
