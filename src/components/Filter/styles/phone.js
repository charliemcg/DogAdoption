import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.notQuiteWhite,
    justifyContent: "space-around",
    alignItems: "center"
  },
  optionWrapper: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: width * 0.8,
    height: width * 0.3
  },
  optionWrapperLeft: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  optionWrapperRight: {
    flex: 7,
    alignItems: "flex-end"
  },
  iconWrapper: {
    flex: 2,
    justifyContent: "center"
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center"
  },
  nameText: {
    fontSize: 30
  },
  topRightWrapper: {
    flex: 2,
    flexDirection: "row"
  },
  resetBtnWrapper: {},
  modalSelector: {
    width: "100%"
  },
  statesWrapper: {
    flex: 2,
    justifyContent: "space-around"
  },
  topRowStates: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  },
  bottomRowStates: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  },
  priceWrapper: {
    flexDirection: "row"
  },
  minPriceWrapper: { flex: 1 },
  maxPriceWrapper: { flex: 1 },
  updateBtn: {
    backgroundColor: colors.primary,
    width: width * 0.7,
    height: width * 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  matchesCountWrapper: {}
};
