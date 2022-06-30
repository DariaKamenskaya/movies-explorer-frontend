import {baseUrlApiMain} from "../utils/constant";


export const createUser = (name, email, password) => {
  return fetch(`${baseUrlApiMain}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};


export const authorize = (email, password) => {
    return fetch(`${baseUrlApiMain}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  };


  export const checkToken = (token) => {
    return fetch(`${baseUrlApiMain}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  };
  

  // метод инициализации данных пользователя
  export const getUserData = () => {
    return fetch(`${baseUrlApiMain}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}` // this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  };


  // сохранение на сервере отредактированных данных пользователя
  export const patchUserMe = ({name, email}) => {
    return fetch(`${baseUrlApiMain}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`, // this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }); 
  }