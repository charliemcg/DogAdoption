import constants from "./constants";

//default state
function getPlaceholderData() {
  return {
    selectedDog: {
      key: null,
      location: null,
      price: null,
      breed: null,
      description: null
    }
  };
}

const reducer = (state = getPlaceholderData(), action) => {
  switch (action.type) {
    case constants.actions.selectedDog:
      state = {
        ...state,
        selectedDog: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
