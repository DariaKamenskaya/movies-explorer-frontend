import React from 'react';
import { Link } from 'react-router-dom';


function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <Link to={'/'} className={'welcome-link welcome-link_blue'}>{'Назад'}</Link>
    </div>
  )
}

export default PageNotFound; 