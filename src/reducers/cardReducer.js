import { CONSTANTS } from '../actions';

const cardData = {
  ID: '',
  height: null
};

export const cardReducer = (params = cardData, action) => {
  switch (action.type) {
    case CONSTANTS.SET_CARD_DATA:
      params = {
        ID: action.payload.ID,
        height: action.payload.height
      };
      return params;
    default:
      return params;
  }
};
