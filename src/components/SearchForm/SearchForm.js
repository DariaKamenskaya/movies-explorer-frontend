// Пути к изображениям внутри сборки
import iconSearch from '../../images/iconSearch.svg'; 
import iconNext from '../../images/iconNext.svg'; 
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <main className="searchForm">
      <div className="searchForm__nav">
        <img src={iconSearch} alt="Поиск" className="searchForm__icon searchForm__icon-search"/>
        <p className="searchForm__title">{'Фильм'}</p>
        <img src={iconNext} alt="Следующий" className="searchForm__icon"/>
      </div>
      <FilterCheckbox/>
    </main>
  );
}

export default SearchForm;