import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import strings from "../../strings";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import constants from "../../constants";
import ListItem from "../ListItem";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import { TouchableHighlight } from "react-native-gesture-handler";

class Filter extends Component {
  render() {
    alert(this.props.breedsList);
    return (
      <SafeAreaView style={styles.parent}>
        <ModalSelector
          style={styles.breedSelector}
          data={this.props.breeds}
          initValue={this.props.selectedBreed}
          onChange={option => {
            // setting results to nothing will bring up the activity indicator for better UX
            this.setState({ results: [] });
            this.getDogs(option);
          }}
          selectTextStyle={{
            color: colors.dark
          }}
          optionTextStyle={{
            color: colors.notQuiteBlack
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedBreed: state.selectedBreed,
    breeds: state.breeds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //actions go here...
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
