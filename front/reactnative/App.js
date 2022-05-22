import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/TabNavigator";
import Modal from "./components/Modal";

const initialState = {
  action: "",
  name: "",
  cart: [],
  modal: {
    hidden: true,
    message: "",
    icon: "",
    iconColor: "",
    closeMsg: "",
  },
  lastTransaction: -1,
};

const reducer = (state = initialState, action) => {
  console.log(action, state);
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    case "ADD_ITEM_CART":
      const cart = state.cart && state.cart.slice() || [];
      cart.push(action.item);
      return { cart };
    case "CLEAR_CART":
      return { cart: [] };
    case "CLEAR_CART":
      return { cart: [] };
    case "SET_MODAL":
      return {
        modal: {
          hidden: false,
          message: action.modal.message,
          icon: action.modal.icon,
          iconColor: action.modal.iconColor,
          closeMsg: action.modal.closeMsg,
        },
      };
    case "RESET_MODAL": {
      return {
        modal: {
          hidden: true,
          message: "",
          icon: "",
          iconColor: "",
          closeMsg: "",
        },
      };
    }
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Modal />
    <AppNavigator />
  </Provider>
);

export default App;
