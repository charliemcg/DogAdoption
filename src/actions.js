import constants from "./constants";

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

export function setSelectedBreed(breed) {
  return {
    type: constants.actions.setSelectedBreed,
    payload: breed
  };
}

export function setResults(results) {
  return {
    type: constants.actions.setResults,
    payload: results
  };
}
