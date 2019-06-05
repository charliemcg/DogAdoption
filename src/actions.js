import constants from "./constants";

export function selectedDog(dog) {
  return {
    type: constants.actions.selectedDog,
    payload: dog
  };
}
