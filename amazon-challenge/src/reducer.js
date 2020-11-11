export const initialState = {
  basket: [],
  user: null,
};

// Selctor
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      // Finds the index of the item in the basket
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      // Make a new basket and allow it to have the previous items
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Cant remove product (id: ${action.id}) as its not in basket!"
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
export default reducer;
