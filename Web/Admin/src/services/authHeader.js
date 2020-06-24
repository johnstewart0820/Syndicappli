export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('token'));
  
    if (user) {
      console.log('Bearer ' + user);
      return { Authorization: 'Bearer ' + user};
    } else {
      return {};
    }
}