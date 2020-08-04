import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from './types';
import { returnErrors } from './errorActions';

// Headers & token config
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState().auth.token;

  // Set headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // If token, add to headers
  if (token) {
    config.headers['auth-token'] = token;
  }

  return config;
}

// Check if user is logged in, Verify token & load user
export const loadUser = () => (dispatch, getState) => {
  // Loading user
  dispatch({ type: USER_LOADING });

  // Make request
  axios.get('https://effie-api.herokuapp.com/verify', tokenConfig(getState)) // Full API user verification url goes here
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));

      dispatch({
        type: AUTH_ERROR
      });
    });
}

// Signup
export const signup = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password });

  // Submit
  axios.post('https://effie-api.herokuapp.com/signup', body, config) // Full API Sign up url goes here
    .then(res => dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'SIGNUP_FAIL'));

      dispatch({
        type: SIGNUP_FAIL
      });
    });
}

// Login
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request data
  const userInfo = JSON.stringify({ email, password });

  // Submit
  axios.post('https://effie-api.herokuapp.com/login', userInfo, config) // Full API Login url goes here
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));

      dispatch({
        type: LOGIN_FAIL
      });
    });
}

// Logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}