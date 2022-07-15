import React from 'react';

class PopupWithForm extends React.Component {


  render() {
    return (
      <section className={`popup  ${this.props.isOpen ? 'popup_is-opened' : ''}`} >
        <div className={`popup__content`} >
          <button className={`popup__close `}  type="button" onClick={this.props.onClosePopup}></button>
          <h3 className="popup__title">{this.props.title}</h3>
        </div>
      </section>
    );
  }
}

export default PopupWithForm; 