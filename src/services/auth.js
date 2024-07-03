import axios from "axios";
import { environment } from "../env/environment";

export const login = (data) => {
  return axios.post(`${environment.baseurl}/api/auth/login`, data);
};
