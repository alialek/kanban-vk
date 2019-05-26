import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCardData } from '../actions';

class TrelloCard extends Component {
  state = {
    isDragging: false,
    cardID: null,
    listID: null
  };

  cardRef = React.createRef();

  startedDrag = e => {
    if (e.target.getAttribute('draggable') !== 'true') {
      e.preventDefault();
      return;
    }
    const { dispatch } = this.props;
    dispatch(
      setCardData(this.cardRef.current.id, this.cardRef.current.offsetHeight)
    );

    let id = e.target.id.split('-');
    this.setState({
      isDragging: true,
      cardID: id[1],
      listID: id[0]
    });
    e.dataTransfer.setData('text', e.target.childNodes[0].innerHTML);
    e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
  };

  dragging = e => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'move';
    this.props.entered
      ? (e.target.style = 'position: absolute;')
      : (e.target.style = 'position: relative');

    let newPositionY = e.clientY + e.target.scrollTop + 20 + 'px'; //+20px, чтобы можно было получить элементы, находящиеся под курсором :(
    let newPositionX = e.clientX - e.target.offsetWidth / 2 + 'px';
    e.target.style.top = newPositionY;
    e.target.style.left = newPositionX;
    e.target.style.zIndex = 100;
  };

  endedDrag = e => {
    this.setState({
      isDragging: false,
      cardID: null,
      listID: null
    });
    e.target.style = 'position: relative';
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable
        ref={this.cardRef}
        onMouseDown={this.mouseDown}
        onDragStart={this.startedDrag}
        onDrag={this.dragging}
        onDragEnd={this.endedDrag}
        className={this.state.isDragging ? 'card dragging' : 'card'}
      >
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default connect()(TrelloCard);
