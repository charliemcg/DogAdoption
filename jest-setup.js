import { NativeModules } from "react-native";

NativeModules.SettingsManager = { settings: jest.fn() };
NativeModules.RNGestureHandlerModule = {};
NativeModules.RNNavigationModule = {};

// jest.mock('react-native-firebase', () => ({
//   analytics: jest.fn(() => ({
//     setCurrentScreen: jest.fn(),
//     logEvent: jest.fn(),
//   })),
// }));

// jest.mock('react-native-languages', () => ({
//   RNLanguages: {
//     language: 'en',
//     languages: ['en'],
//   },
// }));

// jest.mock("react-native-gesture-handler", () => {
//   const View = require("react-native/Libraries/Components/View/View");
//   return {
//     Swipeable: View,
//     DrawerLayout: View,
//     State: {},
//     ScrollView: View,
//     Slider: View,
//     Switch: View,
//     TextInput: View,
//     ToolbarAndroid: View,
//     ViewPagerAndroid: View,
//     DrawerLayoutAndroid: View,
//     WebView: View,
//     NativeViewGestureHandler: View,
//     TapGestureHandler: View,
//     FlingGestureHandler: View,
//     ForceTouchGestureHandler: View,
//     LongPressGestureHandler: View,
//     PanGestureHandler: View,
//     PinchGestureHandler: View,
//     RotationGestureHandler: View,
//     /* Buttons */
//     RawButton: View,
//     BaseButton: View,
//     RectButton: View,
//     BorderlessButton: View,
//     /* Other */
//     FlatList: View,
//     gestureHandlerRootHOC: jest.fn(),
//     Directions: {}
//   };
// });
