import {
  fetchProductsPending, fetchUserError, FetchUserDetails, BASE_URL,
} from './Index';

import { LOGIN_USER_PENDING } from './action-type';

function fetchUser(token) {
  return dispatch => {
    dispatch(fetchProductsPending(LOGIN_USER_PENDING));
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
        dispatch(fetchUserError(error));
      });
  };
}
export default fetchUser;
