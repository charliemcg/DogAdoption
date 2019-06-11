import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    width: width * 0.46,
    height: width * 0.46,
    alignItems: "center",
    paddingTop: width * 0.03,
    borderRadius: 10
  },
  touchable: {
    width: width * 0.4,
    height: width * 0.4,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  imageWrapper: {
    width: "100%",
    height: width * 0.3
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  blurredImage: {
    height: "100%",
    width: "100%"
  },
  favorite: {
    height: width * 0.1,
    width: width * 0.1,
    position: "absolute",
    top: "5%",
    right: "3%"
  },
  heart: {
    height: "100%",
    width: "100%"
  },
  breed: {
    height: width * 0.1,
    width: width * 0.4,
    justifyContent: "center",
    paddingLeft: "5%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  price: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 3,
    left: 3,
    backgroundColor: colors.notQuiteWhite,
    height: "20%",
    width: "40%",
    borderRadius: 10
  },
  coloredPrice: {
    color: colors.dark,
    fontWeight: "bold"
  }
};
