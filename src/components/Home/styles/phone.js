import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  fab: {
    height: width * 0.08,
    width: "40%",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: colors.primary,
    bottom: "6%",
    borderRadius: width * 0.04
  },
  fabTouchableWrapper: {
    backgroundColor: "green",
    height: "100%"
  },
  fabButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  filterTouchable: {
    width: width * 0.2,
    height: width * 0.08,
    borderTopLeftRadius: width * 0.04,
    borderBottomLeftRadius: width * 0.04
  },
  sortTouchable: {
    width: width * 0.2,
    height: width * 0.08,
    borderTopRightRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04
  },
  dividerWrapper: {
    height: width * 0.08,
    justifyContent: "center"
  },
  divider: {
    width: 1,
    height: width * 0.06,
    backgroundColor: colors.dark
  },
  fabIconWrapper: {
    width: "33%",
    height: width * 0.08,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  fabTextWrapper: {
    width: "66%",
    height: width * 0.08,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colors.contrast
  }
};
