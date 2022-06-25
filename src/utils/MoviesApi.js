import {baseUrlMovie} from "../utils/constant";

// класс для работы с BeatfilmMoviesApi
class API {

  constructor(url) {
    this._url = url;
  }

  // метод инициализации карточек
  getInitialMovies() {
    return fetch(`${this._url}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }




























}

// экземпляр класса для работы с BeatfilmMoviesApi
// API для получение данных
export const apiBeatfilmMovies = new API(baseUrlMovie);