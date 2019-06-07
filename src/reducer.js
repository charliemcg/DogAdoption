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
    },
    breeds: []
  };
}

const reducer = (state = getPlaceholderData(), action) => {
  switch (action.type) {
    //the dog which the user is currently viewing
    case constants.actions.selectedDog:
      state = {
        ...state,
        selectedDog: action.payload
      };
      break;
    //the list of breeds
    case constants.actions.breedsList:
      state = {
        ...state,
        breeds: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
