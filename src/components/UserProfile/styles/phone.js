import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const componentWidth = width * 0.7;
const componentHeight = width * 0.15;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  iconWrapper: {
    flex: 3,
    width,
    // backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    width: componentWidth,
    height: componentHeight,
    flexDirection: "row",
    // backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    borderBottomStyle: "solid",
    borderBottomColor: colors.primary,
    borderBottomWidth: 2
  },
  inputIcon: {
    flex: 1
  },
  inputText: {
    flex: 4
  },
  buttonWrapper: {
    flex: 1,
    width,
    // backgroundColor: "#ff0",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: componentWidth,
    height: componentHeight,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  }
};
