import axios from "axios";

const baseURL = "http://localhost:8000/api";

const registerUrl = `${baseURL}/register`;
const loginUrl = `${baseURL}/login`;
const logoutUrl = `${baseURL}/logout`;

const Register = (userData) => axios.post(registerUrl, userData);
const Login = (userData) => axios.post(loginUrl, userData);
const Logout = (token) =>
  axios.post(
    logoutUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export { Register, Login, Logout };
