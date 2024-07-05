import instance from "./token-interceptor";

export const get_dashboard = () => {
  return instance.get(`/api/dashboard`);
};
