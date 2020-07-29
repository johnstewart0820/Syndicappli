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
  createUser(data) {
    return axios.post(API_URL + 'web/admin/user',
      data,
      { headers: authHeader() });
  }
  updateUser(id, data) {
    return axios.put(API_URL + 'web/admin/user/' + id, data,
      { headers: authHeader() });
  }
  deleteUser(id, status) {
    return axios.post(API_URL + 'web/admin/user/' + id + '/delete', status, { headers: authHeader() });
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
  deleteCompany(id, status) {
    return axios.post(API_URL + 'web/admin/company/' + id + '/delete', status, { headers: authHeader() });
  }

  //Building Part
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
  deleteBuilding(id, status) {
    return axios.post(API_URL + 'web/admin/building/' + id + '/delete', status, { headers: authHeader() });
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
  setSuspendOwner(id, data) {
    return axios.put(API_URL + 'web/admin/owner/' + id + '/status', data,
      { headers: authHeader() });
  }
  updateOwner(id, data) {
    return axios.put(API_URL + 'web/admin/owner/' + id, data,
      { headers: authHeader() });
  }
  getOwner(id, data) {
    return axios.post(API_URL + 'web/admin/owner/' + id, data, { headers: authHeader() });
  }
  deleteOwner(id, status) {
    return axios.post(API_URL + 'web/admin/owner/' + id + '/delete', status, { headers: authHeader() });
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
  updateManager(id, data) {
    return axios.put(API_URL + 'web/admin/manager/' + id, data,
      { headers: authHeader() });
  }
  getManager(id) {
    return axios.get(API_URL + 'web/admin/manager/' + id, { headers: authHeader() });
  }
  setSuspendManager(id, data) {
    return axios.put(API_URL + 'web/admin/manager/' + id + '/status', data,
      { headers: authHeader() });
  }
  deleteManager(id, status) {
    return axios.post(API_URL + 'web/admin/manager/' + id + '/delete', status, { headers: authHeader() });
  }

    //DiscountCode Part
    getDiscountCodesList(data) {
      return axios.post(API_URL + 'web/admin/buildingList',
        data,
        { headers: authHeader() });
    }
    createDiscountCode(data) {
      return axios.post(API_URL + 'web/admin/building',
        data,
        { headers: authHeader() });
    }
    updateDiscountCode(id, data) {
      return axios.put(API_URL + 'web/admin/building/' + id, data,
        { headers: authHeader() });
    }
    getDiscountCode(id) {
      return axios.get(API_URL + 'web/admin/building/' + id, { headers: authHeader() });
    }
    deleteDiscountCode(id, status) {
      return axios.post(API_URL + 'web/admin/building/' + id + '/delete', status, { headers: authHeader() });
    }

    //Product Part
    getProductList(data) {
      return axios.post(API_URL + 'web/admin/productList',
        data,
        { headers: authHeader() });
    }
    createProduct(data) {
      return axios.post(API_URL + 'web/admin/product',
        data,
        { headers: authHeader() });
    }
    updateProduct(id, data) {
      return axios.put(API_URL + 'web/admin/product/' + id, data,
        { headers: authHeader() });
    }
    getProduct(id) {
      return axios.get(API_URL + 'web/admin/product/' + id, { headers: authHeader() });
    }
    deleteProduct(id, status) {
      return axios.post(API_URL + 'web/admin/product/' + id + '/delete', status, { headers: authHeader() });
    }

  getBuildingListByCompany(data) {
    return axios.post(API_URL + 'web/admin/buildingListByCompany', data, { headers: authHeader() });
  }
  getCompanyListByUser() {
    return axios.get(API_URL + 'web/admin/companyListByUser', { headers: authHeader() });
  }
}
export class OwnerService {
  //My Account
  updateProfile(data) {
    return axios.post(API_URL + 'web/owner/profile',
      data,
      { headers: authHeader() });
  }
  getProfile() {
    return axios.get(API_URL + 'web/owner/profile', { headers: authHeader() });
  }
  //SubAccount Part
  getOwnerList(data) {
    return axios.post(API_URL + 'web/owner/subAccountList',
      data,
      { headers: authHeader() });
  }
  createOwner(data) {
    return axios.post(API_URL + 'web/owner/subAccount',
      data,
      { headers: authHeader() });
  }
  getOwner(id, data) {
    return axios.post(API_URL + 'web/owner/subAccount/' + id, data, { headers: authHeader() });
  }
  deleteOwner(id) {
    return axios.delete(API_URL + 'web/owner/subAccount/' + id, { headers: authHeader() });
  }
  reinviteOwner(id,data){
    return axios.post(API_URL + 'web/owner/subAccount/' + id + '/reinvite', data, { headers: authHeader() });
  }
  acceptInvitation(data) {
    return axios.post(API_URL + 'web/owner/invitation', data, {});
  }
}

export class ManagerService {
  //My Account
  updateProfile(data) {
    return axios.post(API_URL + 'web/manager/profile',
      data,
      { headers: authHeader() });
  }
  getProfile() {
    return axios.get(API_URL + 'web/manager/profile', { headers: authHeader() });
  }
  //My Company
  updateMyCompany(data) {
    return axios.post(API_URL + 'web/manager/mycompany',
      data,
      { headers: authHeader() });
  }
  getMyCompany() {
    return axios.get(API_URL + 'web/manager/mycompany', { headers: authHeader() });
  }
  //Building Part
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
  deleteBuilding(id, status) {
    return axios.post(API_URL + 'web/manager/building/' + id + '/delete', status, { headers: authHeader() });
  }
  //Owner Part
  getOwnerList(data) {
    return axios.post(API_URL + 'web/manager/ownerList',
      data,
      { headers: authHeader() });
  }
  createOwner(data) {
    return axios.post(API_URL + 'web/manager/owner',
      data,
      { headers: authHeader() });
  }
  updateOwner(id, data) {
    return axios.put(API_URL + 'web/manager/owner/' + id, data,
      { headers: authHeader() });
  }
  getOwner(id, data) {
    return axios.post(API_URL + 'web/manager/owner/' + id, data, { headers: authHeader() });
  }
  setSuspendOwner(id, data) {
    return axios.put(API_URL + 'web/manager/owner/' + id + '/status', data,
      { headers: authHeader() });
  }
  deleteOwner(id, status) {
    return axios.post(API_URL + 'web/manager/owner/' + id + '/delete', status, { headers: authHeader() });
  }
  //Team Part
  getTeamMemberList(data) {
    return axios.post(API_URL + 'web/manager/teamList',
      data,
      { headers: authHeader() });
  }
  createTeamMember(data) {
    return axios.post(API_URL + 'web/manager/team',
      data,
      { headers: authHeader() });
  }
  updateTeamMember(id, data) {
    return axios.put(API_URL + 'web/manager/team/' + id, data,
      { headers: authHeader() });
  }
  getTeamMember(id) {
    return axios.get(API_URL + 'web/manager/team/' + id, { headers: authHeader() });
  }
  setSuspendTeamMember(id, data) {
    return axios.put(API_URL + 'web/manager/team/' + id + '/status', data,
      { headers: authHeader() });
  }
  deleteTeamMember(id, status) {
    return axios.post(API_URL + 'web/manager/team/' + id + '/delete', status, { headers: authHeader() });
  }

  getCompanyListByUser() {
    return axios.get(API_URL + 'web/manager/companyListByUser', { headers: authHeader() });
  }
  getBuildingListByCompany(data) {
    return axios.post(API_URL + 'web/admin/buildingListByCompany', data, { headers: authHeader() });
  }
}

export default new AdminService();