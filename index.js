const redux = require('redux')
const createStore = redux.createStore

const CAKED_ORDERED = "CAKED_ORDERED";
const CAKED_RESTOKED = "CAKED_RESTOKED";

//actionCreator - function that returns an action
function orderCake() {
  //action - object
 return {
    type: CAKED_ORDERED,
    payload: 1
  }
}

function restockCake(qty = 1) {
  //action - object
 return {
    type: CAKED_RESTOKED,
    payload: qty
  }
}

//state - state in redux always represent in object contains the property value of state
const initialState = {
  numOfCakes: 10,
//   sometimes more properties are added
};

//reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKED_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKED_RESTOKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};


const store = createStore(reducer)
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))


//dispatch recieves anactionas a parameter
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(5))



unsubscribe()