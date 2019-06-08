import constants from "./constants";

//default state
function getPlaceholderData() {
  return {
    //all dogs in system
    allDogs: [],
    //the dog which the user is currently looking at
    selectedDog: {
      key: null,
      location: null,
      price: null,
      breed: null,
      description: null
    },
    //all the different types of breeds
    breeds: [],
    //the filters chosen by the user for filtering the results
    searchFilters: {
      breed: null,
      location: null,
      priceMin: null,
      priceMax: null
    },
    //all the dogs in the system accounting for user selected filters
    searchResults: [],
    //user user signed in
    signedIn: false
  };
}

const reducer = (state = getPlaceholderData(), action) => {
  switch (action.type) {
    //all dogs in the system
    case constants.actions.setAllDogs:
      // let moreDogs = state.allDogs;
      let moreDogsArr = [...action.payload];
      let concatenatedArr = moreDogsArr.concat([...state.allDogs]);
      state = {
        ...state,
        allDogs: concatenatedArr
      };
      break;
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
    //the search filters
    case constants.actions.setSearchFilters:
      state = {
        ...state,
        searchFilters: action.payload
      };
      break;
    //the search results
    case constants.actions.setResults:
      state = {
        ...state,
        searchResults: action.payload
      };
      break;
    case constants.actions.signInOut:
      state = {
        ...state,
        signedIn: !state.signedIn
      };
    default:
      return state;
  }
  return state;
};

export default reducer;
