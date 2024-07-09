import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items]; // copy of old item objects
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    
    if (existingCartItemIndex > -1 ) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        qty: existingItem.qty + 1
      }
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.item, qty: 1});
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.qty === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        qty: existingCartItem.qty - 1
      }
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems }
  }

  return state;
}

// wrap this around components that need the cart, ie App.js
export function CartContextProvider({ children }) {
  const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: []});
  
  function addItem(item) {
    dispatchCartAction({type: 'ADD_ITEM', item});
  }

  function removeItem(id) {
    dispatchCartAction({type: 'REMOVE_ITEM', id});
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;