// Пути к изображениям внутри сборки
import iconSearch from '../../images/iconSearch.svg'; 
import iconNext from '../../images/iconNext.svg'; 
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <main className="searchForm">
      <form className="searchForm__nav">
        <button type="button" className="searchForm__button-search searchForm__icon-search" ></button>
        <input required id="name" name="name" type="text" placeholder="Фильм" className="searchForm__input-text" />
        <button type="submit" className="searchForm__button-submit" ></button>
      </form>
      <FilterCheckbox/>
          {/* <div className="searchForm__nav">
    <img src={iconSearch} alt="Поиск" className="searchForm__icon searchForm__icon-search"/>
<p className="searchForm__title">{'Фильм'}</p>
<img src={iconNext} alt="Следующий" className="searchForm__icon"/>
</div> */}
    </main>
  );
}

export default SearchForm;
