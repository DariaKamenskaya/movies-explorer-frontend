

function FilterCheckbox(props) {

  console.log('FilterCheckbox', props.classTumbler)

  return (
    <div className="filterCheckbox">
      <button  className={props.classTumbler} onClick={props.onClick}></button>
      <p className="filterCheckbox__title">{'Короткометражки'}</p>
    </div>
  );
}

export default FilterCheckbox;