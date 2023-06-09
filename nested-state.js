const redux = require("redux");
//from produce immer library //note .produce
const produce = require("immer").produce;


const initialState = {
  name: "Tommy",
  address: {
    street: "Sta.Cruz",
    city: "Iloilo",
    state: "ILO",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

//actions
const updatedStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("initial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("updated State", store.getState());
});
store.dispatch(updatedStreet("Szeged st"));
unsubscribe();
