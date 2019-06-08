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
    width: width * 0.85,
    height: width * 0.3
  },
  optionWrapperLeft: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  optionWrapperRight: {
    flex: 7,
    alignItems: "flex-end",
    backgroundColor: colors.white,
    borderBottomRightRadius: 8
  },
  iconWrapper: {
    flex: 2,
    justifyContent: "center"
  },
  textWrapper: {
    flex: 1,
    paddingLeft: "10%",
    paddingTop: "4%"
  },
  nameText: {
    fontSize: 20,
    color: "#333"
  },
  topRightWrapper: {
    flex: 2,
    flexDirection: "row"
  },
  modalSelectorWrapper: {
    flex: 2,
    width: "100%",
    alignItems: "center"
  },
  modalSelector: {
    width: "90%"
  },
  statesWrapper: {
    flex: 2,
    justifyContent: "space-around",
    width: "100%"
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
  state: {
    width: "20%",
    textAlign: "center"
  },
  priceWrapper: {
    flexDirection: "row",
    flex: 3
  },
  minPriceWrapper: { flex: 1 },
  maxPriceWrapper: { flex: 1 },
  priceSelectorWrapper: { alignItems: "center" },
  priceSelector: { width: "90%" },
  priceText: { color: "#333", paddingLeft: "8%" },
  updateBtn: {
    backgroundColor: colors.primary,
    width: width * 0.7,
    height: width * 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  matchesCountWrapper: {}
};
