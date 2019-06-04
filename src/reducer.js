import constants from "./constants";

//default state
function getPlaceholderData() {
  return {
    data: null // <- get some real data
  };
}

const reducer = (state = getPlaceholderData(), action) => {
  switch (action.type) {
    case constants.changeCountry:
      //Do stuff here...
      state = {
        ...state
      };
      break;
    default:
      return state;
  }
};

export default reducer;
