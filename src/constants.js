export default {
  api: {
    breedsList: "https://dog.ceo/api/breeds/list/all",
    allDogs: "https://dog.ceo/api/breeds/image/random/50",
    imagesStart: "https://dog.ceo/api/breed/",
    imagesEnd: "/images"
  },
  actions: {
    selectedDog: "SELECTED_DOG",
    breedsList: "BREEDS_LIST",
    setSearchFilters: "SET_SEARCH_FILTERS",
    setResults: "SET_RESULTS"
  },
  states: ["WA", "NT", "SA", "QLD", "NSW", "ACT", "VIC", "TAS"],
  legal: {
    privacy:
      "This app will not do anything with your data except blah blah blah"
  }
};
