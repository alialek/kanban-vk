import { CONSTANTS } from '../actions';

let listID = 2;
let cardID = 8;

const initState = [
  {
    title: 'План на месяц',
    id: 0,
    cards: [
      { id: 0, text: 'Пройти курс по React' },
      { id: 1, text: 'Отметить день рождения' },
      {
        id: 2,
        text:
          'Записаться на курсы английского языка, чтобы уехать жить в Лондон'
      },
      {
        id: 3,
        text: 'Сделать бекенд своего сайта на node.js'
      },
      {
        id: 4,
        text: 'Собрать портфолио'
      },
      {
        id: 5,
        text: 'Написать первую статью в блог'
      },
      {
        id: 6,
        text:
          'Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.'
      },
      {
        id: 7,
        text: 'Нет, я серьезный человек, иду в мотошколу. Записываюсь!'
      }
    ]
  },
  {
    title: 'План на день',
    id: 1,
    cards: [
      { id: 0, text: 'Записаться на курс по React' },
      { id: 1, text: 'Забронировать тир на субботу' },
      { id: 2, text: 'Накидать тем для статей в блог' }
    ]
  }
];

export const listsReducer = (state = initState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: listID
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: cardID
      };
      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      });
      cardID += 1;
      return newState;

    case CONSTANTS.CLONE_CARD:
      let clonedCard = {
        id: Number(action.payload.neighbourCard),
        text: action.payload.text
      };

      let oldList = Number(action.payload.oldID.split('-')[0]);
      let oldCard = Number(action.payload.oldID.split('-')[1]);
      const deleteState = state.map(list => {
        let i = -1;
        if (list.id === oldList) {
          let newCards = list.cards
            .filter(card => {
              return card.id !== oldCard;
            })
            .map(card => {
              i = i + 1;
              card.id = i;
              return card;
            });

          return {
            ...list,
            cards: newCards
          };
        } else {
          return list;
        }
      });

      deleteState.map(list => {
        if (list.id === action.payload.listID) {
          list.cards.splice(clonedCard.id, 0, clonedCard);
          let i = -1;
          let cardsToAdd = list.cards.map(card => {
            i = i + 1;
            card.id = i;
            return card;
          });

          return {
            ...list,
            cards: cardsToAdd
          };
        } else {
          return list;
        }
      });
      return deleteState;
    default:
      return state;
  }
};
