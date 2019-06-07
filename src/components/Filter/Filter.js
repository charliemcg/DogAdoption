import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import { setSearchFilters, setResults } from "../../actions";
import { getDogs } from "../../searchAlgorithm";
import strings from "../../strings";
import constants from "../../constants";
import { TouchableHighlight } from "react-native-gesture-handler";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breed: this.props.searchFilters.breed,
      filter: this.props.searchFilters.location
    };
  }

  handleUpdate = () => {
    this.props.setSearchFilters(this.state);
    // setting results to nothing will bring up the activity indicator for better UX
    this.props.setResults([]);
    getDogs();
    this.props.navigation.navigate("Home");
  };

  locations = () => {
    let locations = [];
    for (let i = 0; i < constants.states.length; i++) {
      locations.push({ key: i, label: constants.states[i] });
    }
    return locations;
  };

  render() {
    return (
      <SafeAreaView style={styles.parent}>
        {/* breed selector */}
        <ModalSelector
          style={styles.breedSelector}
          data={this.props.breeds}
          initValue={
            this.props.searchFilters.breed === null
              ? strings.select
              : this.props.searchFilters.breed
          }
          onChange={option => {
            this.setState({ breed: option.label });
          }}
          selectTextStyle={{
            color: colors.dark
          }}
          optionTextStyle={{
            color: colors.notQuiteBlack
          }}
        />
        {/* location selector */}
        <ModalSelector
          style={styles.breedSelector}
          data={this.locations()}
          initValue={
            this.props.searchFilters.location === null
              ? strings.select
              : this.props.searchFilters.location
          }
          onChange={option => {
            this.setState({ location: option.label });
          }}
          selectTextStyle={{
            color: colors.dark
          }}
          optionTextStyle={{
            color: colors.notQuiteBlack
          }}
        />
        <TouchableHighlight onPress={() => this.handleUpdate()}>
          <Text>{strings.updateSearch}</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchFilters: state.searchFilters,
    breeds: state.breeds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchFilters: filters => {
      dispatch(setSearchFilters(filters));
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
