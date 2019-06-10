import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
    marginTop: width * 0.01,
    marginBottom: width * 0.01
  }
};
