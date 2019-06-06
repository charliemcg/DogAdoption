import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: width * 0.95,
    width,
    backgroundColor: colors.notQuiteWhite,
    alignItems: "center"
  },
  imageWrapper: {
    width: width * 0.8,
    height: width * 0.6
  },
  image: {
    flex: 1
  },
  locationRow: {
    height: "5%",
    width,
    flexDirection: "row",
    alignItems: "center"
  },
  breedRow: {
    height: "5%",
    width
  },
  breed: {
    paddingLeft: "10%"
  },
  location: {
    flex: 1,
    paddingLeft: "10%"
  },
  price: {
    flex: 1,
    textAlign: "right",
    paddingRight: "10%"
  },
  description: {
    height: "20%",
    paddingLeft: "3%",
    paddingRight: "3%"
  },
  fade: {
    top: width * 0.7,
    width,
    height: "20%",
    position: "absolute"
  },
  more: {
    flex: 1,
    width,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  }
};
