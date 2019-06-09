import colors from "../../../colors";

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  iconWrapper: {
    // backgroundColor: "pink",
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "10%"
  },
  titleWrapper: {
    // backgroundColor: "blue",
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  // title: {
  //   color: colors.white,
  //   fontSize: 50,
  //   fontWeight: "bold",
  //   zIndex: 1
  // },
  titleBase: {
    position: "absolute",
    width: "100%",
    height: "30%"
    // backgroundColor: "pink"
    // top: "3%"
  }
};
