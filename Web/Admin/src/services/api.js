import axios from 'axios';
import authHeader from './authHeader';
// const HOST_URL = "https://syndic-backend.syndicappli-proto.fr/";
// const API_URL = "https://syndic-backend.syndicappli-proto.fr/api/";
const HOST_URL = "http://192.168.105.38:3001/";
const API_URL = "http://192.168.105.38:3001/api/";
class AdminService {
  //Login
  login(data) {
    console.log(data);
    return axios.post(API_URL + 'auth/login', {email: data.email, password: data.password}, {});
  }
  //My Account
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
  //User
  getUserList(data) {
    return axios.post(API_URL + 'web/admin/userList', data ,{headers: authHeader()});
  }
  getUser(id) {
    return axios.get(API_URL + 'web/admin/user/'+id ,{headers: authHeader()});
  }
  deleteUser(id) {
    return axios.delete(API_URL + 'web/admin/user/'+id ,{headers: authHeader()});
  }
  //Building Part
  getCompanyListByUser() {
    return axios.get(API_URL + 'web/admin/companyListByUser' ,{headers: authHeader()});
  }
  getBuildingList(data) {
    return axios.post(API_URL + 'web/admin/buildingList', 
                          data,
                          {headers: authHeader()});
  }
  createBuilding(data) {
    return axios.post(API_URL + 'web/admin/building', 
                          data,
                          {headers: authHeader()});
  }
  updateBuilding(id,data) {
    return axios.put(API_URL + 'web/admin/building/'+id, data,
                          {headers: authHeader()});
  }
  getBuilding(id) {
    return axios.get(API_URL + 'web/admin/building/'+id ,{headers: authHeader()});
  }
  //Manager Part
  getManagerList(data) {
    return axios.post(API_URL + 'web/admin/managerList', 
                          data,
                          {headers: authHeader()});
  }
  createManager(data) {
    return axios.post(API_URL + 'web/admin/manager', 
                          data,
                          {headers: authHeader()});
  }
}

export default new AdminService();