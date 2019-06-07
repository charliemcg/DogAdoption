import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import { setSearchFilters, setResults } from "../../actions";
import { getDogs } from "../../searchAlgorithm";
import strings from "../../strings";
import { TouchableHighlight } from "react-native-gesture-handler";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breed: this.props.searchFilters.breed
    };
  }

  handleUpdate = () => {
    this.props.setSearchFilters(this.state.breed);
    // setting results to nothing will bring up the activity indicator for better UX
    this.props.setResults([]);
    getDogs();
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <SafeAreaView style={styles.parent}>
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
    setSearchFilters: breed => {
      dispatch(setSearchFilters(breed));
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
