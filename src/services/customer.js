import instance from "./token-interceptor";

export const add_customer = (customer) => {
  return instance.post(`/api/customer`, customer);
};

export const get_customers = () => {
  return instance.get(`/api/customer`);
};

export const get_customer_by_id = (id) => {
  return instance.get(`/api/customer/${id}`);
};

export const update_customer = (id, customer) => {
  return instance.patch(`/api/customer/${id}`, customer);
};

export const delete_customer = (id) => {
  return instance.delete(`/api/customer/${id}`);
};

export const search_customer = (value) => {
  return instance.get(`/api/customer/search`, {
    params: {
      customer_name: value,
    },
  });
};
