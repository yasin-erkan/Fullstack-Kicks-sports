import axios from 'axios';
import {AuthResponse} from '../types';

const api = axios.create({
  // api's address
  baseURL: 'http://localhost:5002/api',
  // sends cookie-stored data with every request to the API
  withCredentials: true,
  // type of data sent to the API
  headers: {
    'Content-Type': 'application/json',
  },
});

// middleware that runs after every API response
// if response is 401 unauthorized, meaning access token has expired
// make request to refresh endpoint to renew access token
// resend the request that got 401 error
api.interceptors.response.use(
  res => res,
  async err => {
    console.log('middleware caught error', err);
    // store the API request that got the error
    const originalReq = err.config;

    // if error code is 401, meaning access token has expired
    if (
      err.response.status === 401 &&
      !originalReq._retry &&
      err.response.data.message === 'Access token expired'
    ) {
      originalReq._retry = true;

      // refresh access token
      try {
        const res = await api.post<AuthResponse>('/auth/refresh');
        console.log('access token refreshed', res);

        // resend original request with renewed access token
        return api(originalReq);
      } catch (err) {
        console.log('access token refresh error', err);
        // if refresh token has expired
        await api.post('/auth/logout');

        // redirect to login page
        window.location.href = '/login';

        // return error when a new error occurs
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  },
);

export default api;
