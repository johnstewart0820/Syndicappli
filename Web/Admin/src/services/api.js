import axios from 'axios';
import authHeader from './authHeader';
// const API_URL = "https://syndic-backend.syndicappli-proto.fr/api/";
const API_URL = "http://192.168.105.38:3001/api/";
class AdminService {
  //Login
  login(data) {
    return axios.post(API_URL + 'auth/login', data, {});
  }
  //firstLogin
  firstLogin(data) {
    return axios.post(API_URL + 'auth/firstLogin', data, {});
  }
  //verifySMS
  verifySMS(data) {
    return axios.post(API_URL + 'auth/verifySMS', data, {});
  }
  //forgotPassword
  forgotPassword(data) {
    return axios.post(API_URL + 'auth/forgotPassword', data, {});
  }
  //resetPassword
  resetPassword(data) {
    return axios.post(API_URL + 'auth/resetPassword', data, {});
  }
  //verifyToken
  verifyToken(data) {
    return axios.post(API_URL + 'auth/verifyToken', data, {});
  }
  //My Account
  updateProfile(data) {
    return axios.post(API_URL + 'web/admin/profile',
      // {lastname: data.lastname , firstname: data.firstname ,
      // email: data.email , phone: data.phone}, 
      data,
      { headers: authHeader() });
  }
  getProfile() {
    return axios.get(API_URL + 'web/admin/profile', { headers: authHeader() });
  }
  //User
  getUserList(data) {
    return axios.post(API_URL + 'web/admin/userList', data, { headers: authHeader() });
  }
  getUser(id) {
    return axios.get(API_URL + 'web/admin/user/' + id, { headers: authHeader() });
  }
  deleteUser(id) {
    return axios.delete(API_URL + 'web/admin/user/' + id, { headers: authHeader() });
  }
  //Company Part
  getCompanyList(data) {
    return axios.post(API_URL + 'web/admin/companyList',
      data,
      { headers: authHeader() });
  }
  addCompany(data) {
    return axios.post(API_URL + 'web/admin/company',
      data,
      { headers: authHeader() });
  }
  updateCompany(id, data) {
    return axios.put(API_URL + 'web/admin/company/' + id, data,
      { headers: authHeader() });
  }
  getCompany(id) {
    return axios.get(API_URL + 'web/admin/company/' + id, { headers: authHeader() });
  }
  //Building Part
  getCompanyListByUser() {
    return axios.get(API_URL + 'web/admin/companyListByUser', { headers: authHeader() });
  }
  getBuildingList(data) {
    return axios.post(API_URL + 'web/admin/buildingList',
      data,
      { headers: authHeader() });
  }
  createBuilding(data) {
    return axios.post(API_URL + 'web/admin/building',
      data,
      { headers: authHeader() });
  }
  updateBuilding(id, data) {
    return axios.put(API_URL + 'web/admin/building/' + id, data,
      { headers: authHeader() });
  }
  getBuilding(id) {
    return axios.get(API_URL + 'web/admin/building/' + id, { headers: authHeader() });
  }
  //Owner Part
  getOwnerList(data) {
    return axios.post(API_URL + 'web/admin/ownerList',
      data,
      { headers: authHeader() });
  }
  createOwner(data) {
    return axios.post(API_URL + 'web/admin/owner',
      data,
      { headers: authHeader() });
  }
  //Manager Part
  getManagerList(data) {
    return axios.post(API_URL + 'web/admin/managerList',
      data,
      { headers: authHeader() });
  }
  createManager(data) {
    return axios.post(API_URL + 'web/admin/manager',
      data,
      { headers: authHeader() });
  }
}
export class OwnerService {

}

export class ManagerService {
  //Building Part
  getCompanyListByUser() {
    return axios.get(API_URL + 'web/manager/companyListByUser', { headers: authHeader() });
  }
  getBuildingList(data) {
    return axios.post(API_URL + 'web/manager/buildingList',
      data,
      { headers: authHeader() });
  }
  createBuilding(data) {
    return axios.post(API_URL + 'web/manager/building',
      data,
      { headers: authHeader() });
  }
  updateBuilding(id, data) {
    return axios.put(API_URL + 'web/manager/building/' + id, data,
      { headers: authHeader() });
  }
  getBuilding(id) {
    return axios.get(API_URL + 'web/manager/building/' + id, { headers: authHeader() });
  }
}

export default new AdminService();