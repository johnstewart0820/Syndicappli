import axios from 'axios';
import authHeader from './authHeader';
const API_URL = "http://192.168.105.38:3001/api/";

class AdminService {
  login(data) {
    return axios.post(API_URL + 'auth/login', {email: data.email, password: data.password}, {});
  }

  updateProfile(data) {
    return axios.post(API_URL + 'web/admin/profile', 
                          // {lastname: data.lastname , firstname: data.firstname ,
                          // email: data.email , phone: data.phone}, 
                          data,
                          {headers: authHeader()});
  }
  getProfile() {
    return axios.get(API_URL + 'web/admin/profile', {headers: authHeader()});
  }
  getUserList(data) {
    return axios.post(API_URL + 'web/admin/userList', data ,{headers: authHeader()});
  }
  getUser(id) {
    return axios.get(API_URL + 'web/admin/user/'+id ,{headers: authHeader()});
  }
  getAllCompanyList() {
    return axios.get(API_URL + 'web/admin/allCompanyList' ,{headers: authHeader()});
  }
//   getUserList(search_value) {
//     return axios.post(API_URL + 'admin/listuser', {search_value}, {headers: authHeader() });
//   }
}

export default new AdminService();