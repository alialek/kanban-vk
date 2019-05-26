import React, { Component } from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import { continueStatement } from '@babel/types';

class App extends Component {
  dragOver = e => {
    e.preventDefault();
  };
  render() {
    const { lists } = this.props;

    return (
      <div className='App'>
        <div className='container' onDragOver={this.dragOver}>
          <div className='row'>
            {lists.map(list => {
              return (
                <TrelloList
                  listID={list.id}
                  title={list.title}
                  cards={list.cards}
                  key={list.id}
                />
              );
            })}
            <AddButton list />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
