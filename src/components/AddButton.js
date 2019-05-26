import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList, addCard } from '../actions';

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.textAreaAdjust = React.createRef();
    this.incrementRows = this.incrementRows.bind(this);
  }

  state = {
    formOpen: false,
    numberOfRows: 2,
    text: ''
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  createList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      dispatch(addList(text));
      this.setState({
        text: ''
      });
    }
    return;
  };

  createCard = () => {
    const { listID, dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addCard(listID, text));
      this.setState({
        text: ''
      });
    }
    return;
  };

  /*Растягиваем Textarea под размер введенного текста*/

  incrementRows = () => {
    let numberOfRows = Math.floor(
      this.textAreaAdjust.current.scrollHeight / 19.5
    );
    console.log(numberOfRows);
    if (numberOfRows > 2) {
      this.setState({
        numberOfRows
      });
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list
      ? 'Добавить еще одну колонку'
      : 'Добавить еще одну карточку';

    return (
      <div onClick={this.openForm} className='column-footer'>
        <img alt='add new' src='fonts/icons/plus.svg' />
        <p>{buttonText}</p>
      </div>
    );
  };

  saveText = e => {
    this.setState({
      text: e.target.value
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false
    });
  };

  renderForm = () => {
    const { list } = this.props;

    const placeholder = list
      ? 'Введите название столбца'
      : 'Введите название карточки';

    const buttonTitle = list ? 'Добавить колонку' : 'Добавить карточку';
    return (
      <div className='column-footer'>
        <form>
          <textarea
            autoFocus
            rows={this.state.numberOfRows}
            ref={this.textAreaAdjust}
            onInput={this.incrementRows}
            placeholder={placeholder}
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.saveText}
          />
          <div className='flex'>
            <button onMouseDown={list ? this.createList : this.createCard}>
              {buttonTitle}
            </button>
            <img
              src='fonts/icons/plus.svg'
              alt='close textarea'
              className='close-button'
              onClick={this.closeForm}
            />
          </div>
        </form>
      </div>
    );
  };
  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(AddButton);
