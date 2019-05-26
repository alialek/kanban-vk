import { CONSTANTS } from './index';

export const addCard = (listID, text) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { listID, text }
  };
};

export const deleteCard = (listID, cardID) => {
  return {
    type: CONSTANTS.DELETE_CARD,
    payload: { listID, cardID }
  };
};

export const cloneCard = (listID, text, neighbourCard, oldID) => {
  return {
    type: CONSTANTS.CLONE_CARD,
    payload: { listID, text, neighbourCard, oldID }
  };
};

export const setCardData = (ID, height) => {
  return {
    type: CONSTANTS.SET_CARD_DATA,
    payload: { ID, height }
  };
};
