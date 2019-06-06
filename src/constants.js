export default {
  api: {
    breedsList: "https://dog.ceo/api/breeds/list/all",
    imagesStart: "https://dog.ceo/api/breed/",
    imagesEnd: "/images"
  },
  actions: {
    selectedDog: "SELECTED_DOG"
  },
  states: ["WA", "NT", "SA", "QLD", "NSW", "ACT", "VIC", "TAS"]
};
