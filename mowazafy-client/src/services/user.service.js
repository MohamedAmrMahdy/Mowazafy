import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8081/api/';
class UserService {
  getAll() {
    return axios.get(API_URL + "employee/", { headers: authHeader() });
  }
  get(id) {
    return axios.get(API_URL + `employee/${id}`), { headers: authHeader() };
  }
  create(data) {
    return axios.post(API_URL + "employee/", { headers: authHeader() }, data);
  }
  update(id, data) {
    return axios.put(API_URL + `employee/${id}`, { headers: authHeader() }, data);
  }
  delete(id) {
    return axios.delete(API_URL + `employee/${id}`, { headers: authHeader() });
  }
  deleteAll() {
    return axios.delete(API_URL + `employee/`, { headers: authHeader() });
  }
}
export default new UserService();