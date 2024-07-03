import instance from "./token-interceptor";

export const add_location = (data) => {
  return instance.post(`/api/location`, data);
};

export const get_locaions = () => {
  return instance.get(`/api/location`);
};

export const get_location_by_id = (id) => {
  return instance.get(`/api/location/${id}`);
};

export const update_location = (id, value) => {
  return instance.put(`/api/location/${id}`, value);
};

export const delete_location = (id) => {
  return instance.delete(`/api/location/${id}`);
};

export const search_location = (value) => {
  return instance.get(`/api/location/search`, {
    params: {
      location: value,
    },
  });
};
