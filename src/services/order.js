import instance from "./token-interceptor";

export const get_order_no = (customer_name) => {
  return instance.post(`/api/order/order_no`, customer_name);
};

export const get_customers = () => {
  return instance.get(`/api/customer`);
};

export const get_products = () => {
  return instance.get(`/api/product`);
};

export const add_order = (data) => {
  return instance.post(`/api/order`, data);
};

export const get_orders = () => {
  return instance.get(`/api/order`);
};

export const get_order_by_id = (id) => {
  return instance.get(`/api/order/${id}`);
};

export const delete_order = (id) => {
  return instance.delete(`/api/order/${id}`);
};

export const update_order = (id, data) => {
  return instance.patch(`/api/order/${id}`, data);
};
