import React from 'react';
import TrelloCard from './TrelloCard';
import AddButton from './AddButton';
import { cloneCard } from '../actions';
import { connect } from 'react-redux';

class TrelloList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderEnabled: false,
      height: null,
      ID: ''
    };
  }

  closest = (el, clazz, stopClazz) => {
    if (el.classList.contains(stopClazz)) return null;

    while (
      (el = el.parentElement) &&
      !el.classList.contains(clazz) &&
      !el.classList.contains(stopClazz)
    );

    return el.classList.contains(stopClazz) ? null : el;
  };

  getCard = (ID, height) => {
    this.setState({ ID, height });
  };

  newDiv = document.createElement('div');

  dragEnter = e => {
    this.setState({
      placeholderEnabled: true
    });

    let target = this.closest(e.target, 'card', 'container');
    if (target) {
      this.newDiv.className = 'card-placeholder';
      this.newDiv.id = 'card-placeholder';
      this.newDiv.style.height = this.props.cardData.height + 'px';
      target.parentElement.insertBefore(this.newDiv, target.nextElementSibling);
    }
  };
  dragHeaderEnter = e => {
    this.setState({
      placeholderEnabled: true
    });

    let target = this.closest(e.target, 'column-header', 'container');
    if (target) {
      this.newDiv.className = 'card-placeholder';
      this.newDiv.id = 'card-placeholder';
      this.newDiv.style.height = this.props.cardData.height + 'px';
      target.nextElementSibling.appendChild(this.newDiv);
    }
  };

  finishDrop = e => {
    const { dispatch } = this.props;
    let text = e.dataTransfer.getData('Text');
    let neighbourCard = 0;
    let listID = Number(e.target.parentElement.id.split('-')[0]);
    let oldID = this.props.cardData.ID;

    if (this.closest(e.target, 'column-header', 'container')) {
      let target = this.closest(e.target, 'column-header', 'container');
      listID = Number(target.nextElementSibling.id);
      dispatch(cloneCard(listID, text, neighbourCard, oldID));
    }

    if (e.target.className === 'cards') {
      listID = Number(e.target.id);
      dispatch(cloneCard(listID, text, neighbourCard, oldID));
      console.log(1);
    } else if (e.target.parentElement.className === 'cards') {
      try {
        if (e.target.nextElementSibling.id === 'card-placeholder') {
          neighbourCard = e.target.id.split('-')[1];
        } else {
          neighbourCard = e.target.nextElementSibling.id.split('-')[1];
        }
      } catch {
        neighbourCard = e.target.previousElementSibling.id.split('-')[1];
      }
      listID = Number(e.target.parentElement.id.split('-')[0]);
      dispatch(cloneCard(listID, text, neighbourCard, oldID));
    } else if (e.target.parentElement.parentElement.className === 'cards') {
      if (e.target.parentElement.nextElementSibling.id) {
        neighbourCard = e.target.parentElement.nextElementSibling.id.split(
          '-'
        )[1];
      } else {
        neighbourCard = e.target.parentElement.previousElementSibling.id.split(
          '-'
        )[1];
      }

      dispatch(cloneCard(listID, text, neighbourCard, oldID));
    }

    while (document.getElementById('card-placeholder')) {
      document.getElementById('card-placeholder').remove();
    }

    this.setState({
      placeholderEnabled: false,
      ID: '',
      height: null
    });
  };

  render() {
    return this.props.title ? (
      <div className='column'>
        <div
          onDragEnter={this.dragHeaderEnter}
          onDrop={this.finishDrop}
          className='column-header'
        >
          <p>{this.props.title}</p>
        </div>
        <div
          onDragEnter={this.dragEnter}
          onDrop={this.finishDrop}
          id={this.props.listID}
          className='cards'
        >
          {this.props.cards.map(card => {
            return (
              <TrelloCard
                key={card.id}
                id={`${this.props.listID}-${card.id}`}
                text={card.text}
                setCard={this.getCard}
                entered={this.state.placeholderEnabled}
              />
            );
          })}
        </div>
        <AddButton listID={this.props.listID} />
      </div>
    ) : (
      <div className='column'>
        <AddButton list />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cardData: state.cardData
});

export default connect(mapStateToProps)(TrelloList);
