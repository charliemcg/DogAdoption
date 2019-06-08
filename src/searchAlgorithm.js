import store from "./store";
import constants from "./constants";
import { setResults, setAllDogs } from "./actions";

export function loadAllDogsInSystem() {
  let imgArr = [];
  fetch(
    //get all dogs of all breeds
    constants.api.allDogs
  )
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      for (let i = 0; i < data.message.length; i++) {
        let trimmedString = "";
        // need to extract breed from the image url
        //removing the head
        trimmedString = String(data.message[i]).replace(
          "https://images.dog.ceo/breeds/",
          ""
        );
        //removing the tail
        let tailString = trimmedString.substring(trimmedString.indexOf("/"));
        trimmedString = trimmedString.replace(tailString, "");
        //simplifying more complicated breed types
        let subBreedIndex = trimmedString.indexOf("-");
        let subTailString = trimmedString.substring(subBreedIndex);
        if (subBreedIndex > 0) {
          trimmedString = trimmedString.replace(subTailString, "");
        }
        imgArr.push({
          key: String(data.message[i]),
          location: constants.states[Math.floor(Math.random() * 8)],
          price: this.generatePrice(),
          breed: trimmedString,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi."
        });
      }
      store.dispatch(setAllDogs(imgArr));
      getDogs();
    })
    .catch(e => console.log(e));
}

//////////////////////Following code only gets exact matches. Need to get close matches too/////////////////////////////
// //get dogs filtered by search results
// export function getDogs() {
//   const breed = store.getState().searchFilters.breed;
//   const imgArr =
//     breed === null
//       ? store.getState().allDogs
//       : this.getFilteredDogs(store.getState().allDogs);
//   store.dispatch(setResults(imgArr));
// }

// getFilteredDogs = dogs => {
//   let filteredArr = [...this.checkBreed(dogs)];
//   return filteredArr;
// };

// checkBreed = dogs => {
//   const breed = store.getState().searchFilters.breed;
//   let filteredArr = [];
//   for (let i = 0; i < dogs.length; i++) {
//     const validated = dogs[i].breed === breed && this.checkLocation(dogs[i]);
//     validated && filteredArr.push(dogs[i]);
//   }
//   return filteredArr;
// };

// checkLocation = breedVerifiedDog => {
//   const location = store.getState().searchFilters.location;
//   return breedVerifiedDog.location === location && true;
// };
///////////////////////////////////////////////////

//get dogs filtered by search results
export function getDogs() {
  const breed = store.getState().searchFilters.breed;
  const location = store.getState().searchFilters.location;
  const unfilteredDogsArr = [...store.getState().allDogs];
  let exactMatchesArr = [];
  let oneDegreeFromExactArr = [];
  for (let i = 0; i < unfilteredDogsArr.length; i++) {
    const dog = unfilteredDogsArr[i];
    let count = 0;
    dog.breed === breed && count++;
    dog.location === location && count++;
    switch (count) {
      case 2:
        exactMatchesArr.push(unfilteredDogsArr[i]);
        break;
      case 1:
        oneDegreeFromExactArr.push(unfilteredDogsArr[i]);
        break;
    }
  }
  const orderedByMatchArr = exactMatchesArr.concat(oneDegreeFromExactArr);
  oneDegreeFromExactArr.length === 0
    ? store.dispatch(setResults(unfilteredDogsArr))
    : store.dispatch(setResults(orderedByMatchArr));
}

//generating placeholder prices. Not to be used in production
generatePrice = () => {
  // Getting a price between 0 and 2000 rounded up to the nearest 100
  // prettier-ignore
  let price = Math.ceil(Math.floor((Math.random() * 2000) + 1) / 100) * 100;

  // some dogs should be free
  // prettier-ignore
  if (Math.floor(Math.random() * 6) === 0) {
    return "Free";
  }

  return `$${price}`;
};
