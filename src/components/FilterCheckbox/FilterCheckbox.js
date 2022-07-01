

function FilterCheckbox(props) {


  return (
    <div className="filterCheckbox">
      <button  className={props.classTumbler} onClick={props.onClick}></button>
      <p className="filterCheckbox__title">{'Короткометражки'}</p>
    </div>
  );
}

export default FilterCheckbox;