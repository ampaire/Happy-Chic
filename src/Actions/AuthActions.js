import {
  FetchUserDetails,
  fetchUsersError,
  LOGIN_USER,
  BASE_URL,
} from './Index';

import { inputValidation } from '../Helpers/Index';

export const loginUser = data => dispatch => {
  fetch(`${BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw (res.error);
      }
      if (res.auth_token !== undefined) {
        dispatch(LOGIN_USER(res));
      }
      return res;
    })
    .catch(error => {
      dispatch(fetchUsersError(error));
    });
};

export const createUser = () => dispatch => {
  const event = new FormData();
  fetch(`${BASE_URL}/users`,
    {
      method: 'POST',
      body: event,
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw (res.error);
      }
      if (res.auth_token !== undefined) {
        dispatch(LOGIN_USER(res));
      } else {
        inputValidation(res);
      }
      return res;
    })
    .catch(error => error);
};

export const fetchUser = token => dispatch => {
  fetch(`${BASE_URL}/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      dispatch(FetchUserDetails(res));
    })
    .catch(error => {
      dispatch(fetchUsersError(error));
    });
};

export const editProfile = (data, token, callBack) => {
  const event = JSON.stringify(data);
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: event,
  };
  fetch(`${BASE_URL}/edit-profile`, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      if (res.id !== undefined) {
        callBack();
      } else {
        inputValidation(res);
      }
      return res;
    })
    .catch(error => error);
};
