import { combineReducers } from 'redux';
import { cardReducer } from './cardReducer';
import { listsReducer } from './listReducer';

export default combineReducers({
  lists: listsReducer,
  cardData: cardReducer
});
