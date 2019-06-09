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
    width: width * 0.85,
    height: width * 0.6
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1
  },
  blurredImage: {
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
    width,
    flexDirection: "row"
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
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: "10%"
  },
  date: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: "10%"
  },
  coloredPrice: {
    color: colors.dark
  },
  description: {
    height: "20%",
    width: width * 0.85
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
    alignItems: "center",
    backgroundColor: colors.white
  }
};
