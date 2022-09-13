import Redux from "redux";

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";

// action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

// action creator
function cakeRestock(qty = 1) {
  return {
    type: CAKE_RESTOCK,
    payload: qty,
  };
}

// initial state as object
const initialState = {
  numOfCakes: 10,
};

// creating reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED: {
      return {
        numOfCakes: state.numOfCakes - 1,
      };
    }
    case CAKE_RESTOCK: {
      return {
        numOfCakes: state.numOfCakes + action.payload,
      };
    }
    default:
      return state;
  }
};

// creating store
const store = Redux.createStore(reducer);
console.log("Initial State", store.getState());

// subsribe listener
const unsubscribe = store.subsribe(() =>
  console.log("update state", store.getState())
);
// unsubscibe listener
unsubscribe();

// dispatching action
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
// restocking cake
store.dispatch(cakeRestock());
