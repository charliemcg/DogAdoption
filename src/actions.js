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
