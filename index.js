const redux = require('redux')
const createStore = redux.createStore
//bindActionCreators is a helper function to invoke actions directly
const bindActionCreators = redux.bindActionCreators
//combine reducers
const combineReducers = redux.combineReducers

const CAKED_ORDERED = "CAKED_ORDERED";
const CAKED_RESTOKED = "CAKED_RESTOKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOKED = "ICECREAM_RESTOKED";


//#1 ACTIONS 
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

function orderIceCream(qty = 1) {
  //action - object
 return {
    type: ICECREAM_ORDERED,
    payload: qty
  }
}

function restockIceCream(qty = 1) {
  //action - object
 return {
    type: ICECREAM_RESTOKED,
    payload: qty
  }
}

//state - state in redux always represent in object contains the property value of state
const initialCakeState = {
  numOfCakes: 10,
//   sometimes more properties are added
};
const initialIceCreamState = {
  numOfIceCream: 10,
//   sometimes more properties are added
};
//#2 REDUCERS

const cakeReducer = (state = initialCakeState, action) => {
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
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case CAKED_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    case CAKED_RESTOKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

//combineReducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

//#3 STORE
const store = createStore(rootReducer)
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))


//dispatch recieves an action as a parameter
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

console.log("cake", store.getState().cake.numOfCakes)

unsubscribe()