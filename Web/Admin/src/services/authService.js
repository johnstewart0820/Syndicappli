class AuthService {
    getToken() {
        return JSON.parse(localStorage.getItem('token'));
    }
    logout() {
        localStorage.removeItem("token");
    }
    getAccess(item) {
        return JSON.parse(localStorage.getItem(item));
    }
}
export default new AuthService();