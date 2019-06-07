import store from "./store";
import constants from "./constants";
import { setResults } from "./actions";

export function getDogs() {
  const option = store.getState().selectedBreed;
  let imgArr = [];
  fetch(
    //get all breeds when no breed selected
    option === null
      ? constants.api.allDogs
      : `${constants.api.imagesStart}${option}${constants.api.imagesEnd}`
  )
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      for (let i = 0; i < data.message.length; i++) {
        let trimmedString = "";
        if (option === null) {
          // need to extract breed from the image url
          //removing the head
          trimmedString = String(data.message[i]).replace(
            "https://images.dog.ceo/breeds/",
            ""
          );
          //removing the tail
          let tailString = trimmedString.substring(trimmedString.indexOf("/"));
          trimmedString = trimmedString.replace(tailString, "");
        }
        imgArr.push({
          key: String(data.message[i]),
          location: constants.states[Math.floor(Math.random() * 8)],
          price: this.generatePrice(),
          breed: option === null ? trimmedString : option,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi."
        });
      }
      store.dispatch(setResults(imgArr));
    })
    .catch(e => console.log(e));

  // return null;
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
