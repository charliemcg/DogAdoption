import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.notQuiteWhite,
    justifyContent: "center",
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
    height: "10%",
    width,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  description: {
    height: "20%",
    paddingLeft: "3%",
    paddingRight: "3%"
  }
};
