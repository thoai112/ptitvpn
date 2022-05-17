export default function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-access-token': token };       // for Node.js Express back-end
  } else {
    return {};
  }
}
