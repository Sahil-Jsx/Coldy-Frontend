import instance from "./token-interceptor";

export const get_products = () => {
  return instance.get(`/api/product`);
};

export const add_product = (product) => {
  return instance.post(`/api/product`, product);
};

export const get_product_by_id = (id) => {
  return instance.get(`/api/product/${id}`);
};

export const update_product = (id, product) => {
  return instance.put(`/api/product/${id}`, product);
};

export const delete_product = (id) => {
  return instance.delete(`/api/product/${id}`);
};

export const search_product = (product_name) => {
  return instance.get(`/api/product/search`, {
    params: {
      product_name,
    },
  });
};
