import constants from "./constants";

export function setAllDogs(results) {
  return {
    type: constants.actions.setAllDogs,
    payload: results
  };
}

export function selectedDog(dog) {
  return {
    type: constants.actions.selectedDog,
    payload: dog
  };
}

export function breedsList(breeds) {
  return {
    type: constants.actions.breedsList,
    payload: breeds
  };
}

export function setSearchFilters(filters) {
  return {
    type: constants.actions.setSearchFilters,
    payload: filters
  };
}

export function setResults(results) {
  return {
    type: constants.actions.setResults,
    payload: results
  };
}
