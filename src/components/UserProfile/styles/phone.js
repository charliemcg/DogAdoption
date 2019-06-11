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
  iconWrapper: {
    height: "29%",
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  details: {
    height: "15%",
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  gridRow: {
    height: "22%",
    width,
    flexDirection: "row",
    paddingRight: "2%",
    paddingLeft: "2%"
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContentsWrapper: {
    height: "90%",
    width: "100%",
    marginTop: "5%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "90%",
    backgroundColor: colors.primary
  },
  signOutBtnWrapper: {
    height: "12%",
    width,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "2%",
    paddingLeft: "2%"
  },
  signOutBtn: {
    width: "95%",
    height: "90%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  signOutContentsWrapper: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btnText: {
    color: colors.contrast,
    fontSize: 20
  },
  // recently viewed
  recents: {
    marginLeft: "3%",
    fontSize: 17
  }
};
