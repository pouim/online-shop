import axios from 'axios';
import { Cookies } from 'react-cookie';


const jwtAxios = axios.create({
  baseURL: 'http://185.206.147.122:8005/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token: string | null) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Token ' + token;
    const cookies = new Cookies();
    cookies.set("token", token, { path: "/" });
    // localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
      const cookies = new Cookies();
      cookies.remove("token");
    // localStorage.removeItem('token');
  }
};




export default jwtAxios;
