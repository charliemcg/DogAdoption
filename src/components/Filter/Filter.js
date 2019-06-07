import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import { setSelectedBreed, setResults } from "../../actions";
import { getDogs } from "../../searchAlgorithm";

class Filter extends Component {
  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <ModalSelector
          style={styles.breedSelector}
          data={this.props.breeds}
          initValue={this.props.selectedBreed}
          onChange={option => {
            this.props.setSelectedBreed(option.label);
            // setting results to nothing will bring up the activity indicator for better UX
            this.props.setResults([]);
            getDogs();
            this.props.navigation.navigate("Home");
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
    setSelectedBreed: breed => {
      dispatch(setSelectedBreed(breed));
    },
    setResults: results => {
      dispatch(setResults(results));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
