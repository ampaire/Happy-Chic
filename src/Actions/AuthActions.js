import {
  LOGIN_USER,
  BASE_URL,
} from './Index';
import { LOGIN_USER_PENDING } from './Type';

export const loginUser = (data) => {
  <LOGIN_USER_PENDING />
  return dispatch => {
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
        dispatch(fetchProductsError(error));
      });
  };
}

export const createUser = (data) => {
  return dispatch => {
    const event = new FormData();
    for (const name in data) {
      event.append(name, data[name]);
    }
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
}

