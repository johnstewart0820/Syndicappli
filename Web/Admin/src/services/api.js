import axios from 'axios';
import authHeader from './authHeader';
const HOST_URL = "https://syndic-backend.syndicappli-proto.fr/";
const API_URL = "https://syndic-backend.syndicappli-proto.fr/api/";

class AdminService {
  login(data) {
    console.log(data);
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
  getProfileAvatar() {
    return HOST_URL + 'public/avatar/';
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
  deleteUser(id) {
    return axios.delete(API_URL + 'web/admin/user/'+id ,{headers: authHeader()});
  }
//   getUserList(search_value) {
//     return axios.post(API_URL + 'admin/listuser', {search_value}, {headers: authHeader() });
//   }
}

export default new AdminService();