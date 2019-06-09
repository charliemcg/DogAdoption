import React, { Component } from "react";
import { SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import { setSearchFilters, setResults } from "../../actions";
import { getDogs } from "../../searchAlgorithm";
import strings from "../../strings";
import constants from "../../constants";
import { TouchableHighlight } from "react-native-gesture-handler";
import IconAwesome from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breed: this.props.searchFilters.breed,
      location: this.props.searchFilters.location,
      priceMin: this.props.searchFilters.priceMin,
      priceMax: this.props.searchFilters.priceMax
    };
  }

  handleUpdate = () => {
    this.props.setSearchFilters(this.state);
    // setting results to nothing will bring up the activity indicator for better UX
    this.props.setResults([]);
    getDogs();
    this.props.navigation.navigate("Home");
  };

  // locations = () => {
  //   let locations = [];
  //   for (let i = 0; i < constants.states.length; i++) {
  //     locations.push({ key: i, label: constants.states[i] });
  //   }
  //   return locations;
  // };

  minPrices = () => {
    let { priceMax } = this.state;
    const upperRange =
      priceMax === null ? 2000 : priceMax === "Free" ? 0 : priceMax;
    let prices = [];
    //make it so that user cannot select a value greater than the selected maximum
    for (let i = 0; i <= upperRange; i += 100) {
      prices.push({ key: i / 10, label: i === 0 ? "Free" : i });
    }
    return prices;
  };

  maxPrices = () => {
    const { priceMin } = this.state;
    let prices = [];
    //make it so that user cannot select a value lower than the selected minimum
    for (
      let i = priceMin === null ? 0 : priceMin === "Free" ? 0 : priceMin;
      i <= 2000;
      i += 100
    ) {
      prices.push({ key: i / 10, label: i === 0 ? "Free" : i });
    }
    return prices;
  };

  filterOptionSkeleton = props => {
    return (
      <View style={styles.optionWrapper}>
        <View style={styles.optionWrapperLeft}>
          <View style={styles.iconWrapper}>{props.icon}</View>
        </View>
        <View style={styles.optionWrapperRight}>
          <View style={styles.topRightWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.nameText}>{props.filterName}</Text>
            </View>
            <IconMCI name="close" size={20} color="#333" />
          </View>
          {props.filterOptions}
        </View>
      </View>
    );
  };

  render() {
    const breedOptions = (
      <View style={styles.modalSelectorWrapper}>
        <ModalSelector
          style={styles.modalSelector}
          data={this.props.breeds}
          initValue={
            this.state.breed === null ? strings.select : this.state.breed
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
      </View>
    );

    stateStyle = state => {
      return this.state.location === state
        ? styles.selectedState
        : styles.state;
    };

    const locationOptions = (
      <View style={styles.statesWrapper}>
        <View style={styles.topRowStates}>
          <Text
            style={stateStyle(constants.states[0])}
            onPress={() => this.setState({ location: constants.states[0] })}
          >
            {constants.states[0]}
          </Text>
          <Text
            style={stateStyle(constants.states[1])}
            onPress={() => this.setState({ location: constants.states[1] })}
          >
            {constants.states[1]}
          </Text>
          <Text
            style={stateStyle(constants.states[3])}
            onPress={() => this.setState({ location: constants.states[3] })}
          >
            {constants.states[3]}
          </Text>
          <Text
            style={stateStyle(constants.states[6])}
            onPress={() => this.setState({ location: constants.states[6] })}
          >
            {constants.states[6]}
          </Text>
        </View>
        <View style={styles.bottomRowStates}>
          <Text
            style={stateStyle(constants.states[2])}
            onPress={() => this.setState({ location: constants.states[2] })}
          >
            {constants.states[2]}
          </Text>
          <Text
            style={stateStyle(constants.states[4])}
            onPress={() => this.setState({ location: constants.states[4] })}
          >
            {constants.states[4]}
          </Text>
          <Text
            style={stateStyle(constants.states[5])}
            onPress={() => this.setState({ location: constants.states[5] })}
          >
            {constants.states[5]}
          </Text>
          <Text
            style={stateStyle(constants.states[7])}
            onPress={() => this.setState({ location: constants.states[7] })}
          >
            {constants.states[7]}
          </Text>
        </View>
      </View>
    );

    const priceOptions = (
      <View style={styles.priceWrapper}>
        <View style={styles.minPriceWrapper}>
          <Text style={styles.priceText}>Price min.</Text>
          <View style={styles.priceSelectorWrapper}>
            <ModalSelector
              style={styles.priceSelector}
              data={this.minPrices()}
              initValue={
                this.state.priceMin === null
                  ? strings.select
                  : this.state.priceMin
              }
              onChange={option => {
                this.setState({
                  priceMin: option.label
                });
              }}
              selectTextStyle={{
                color: colors.dark
              }}
              optionTextStyle={{
                color: colors.notQuiteBlack
              }}
            />
          </View>
        </View>
        <View style={styles.maxPriceWrapper}>
          <Text style={styles.priceText}>Price max.</Text>
          <View style={styles.priceSelectorWrapper}>
            <ModalSelector
              style={styles.priceSelector}
              data={this.maxPrices()}
              initValue={
                this.state.priceMax === null
                  ? strings.select
                  : this.state.priceMax
              }
              onChange={option => {
                this.setState({
                  priceMax: option.label
                });
              }}
              selectTextStyle={{
                color: colors.dark
              }}
              optionTextStyle={{
                color: colors.notQuiteBlack
              }}
            />
          </View>
        </View>
      </View>
    );

    const breedIcon = (
      <IconAwesome name="dog" size={45} color={colors.primary} />
    );
    const locationIcon = (
      <IconEntypo name="location-pin" size={45} color={colors.primary} />
    );
    const priceIcon = (
      <IconAwesome name="dollar-sign" size={45} color={colors.primary} />
    );

    const matches = (
      <View style={styles.matchesCountWrapper}>
        <View style={styles.matchesLabels}>
          <Text>Exact Matches:</Text>
          <Text>Close Matches:</Text>
        </View>
        <View style={styles.matchesValues}>
          <Text>1234</Text>
          <Text>5678</Text>
          {/* <ActivityIndicator
            size="small"
            color={colors.dark}
            style={styles.activityIndicator}
          /> */}
        </View>
      </View>
    );

    const updateButton = (
      <TouchableHighlight
        onPress={() => this.handleUpdate()}
        style={styles.updateBtn}
      >
        <Text style={styles.nameText}>{strings.updateSearch}</Text>
      </TouchableHighlight>
    );

    return (
      <SafeAreaView style={styles.parent}>
        {/* breed selector */}
        {this.filterOptionSkeleton({
          icon: breedIcon,
          filterName: "Breed",
          filterOptions: breedOptions
        })}
        {/* location selector */}
        {this.filterOptionSkeleton({
          icon: locationIcon,
          filterName: "Location",
          filterOptions: locationOptions
        })}
        {/* price selector */}
        {this.filterOptionSkeleton({
          icon: priceIcon,
          filterName: "Price",
          filterOptions: priceOptions
        })}
        {/* number of matches */}
        {matches}
        {/* apply changes button */}
        {updateButton}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchFilters: state.searchFilters,
    searchResults: state.searchRsults,
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
