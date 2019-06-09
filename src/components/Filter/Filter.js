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

  //called every time the user changes a filter
  updateResults = () => {
    this.props.setSearchFilters(this.state);
    //setting results to nothing will bring up the activity indicator for better UX
    this.props.setResults(null); // <- replace with a loading flag in state
    setTimeout(() => getDogs(), 3000); // <- shouldn't need this fake loader
    // getDogs();
  };

  // handleUpdate = () => {
  //   this.props.setSearchFilters(this.state);
  //   // setting results to nothing will bring up the activity indicator for better UX
  //   this.props.setResults([]);
  //   getDogs();
  //   this.props.navigation.navigate("Home");
  // };

  //these are the options for the minimum price modal selector
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

  //these are the options for the maximum price modal selector
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

  //the matches. either return match figures or loading indicator
  matchData = () => {
    return this.props.searchResults === null ? (
      <ActivityIndicator
        size="small"
        color={colors.dark}
        style={styles.activityIndicator}
      />
    ) : (
      <View>
        <Text>//TODO</Text>
        <Text>{this.props.searchResults.length}</Text>
      </View>
    );
  };

  //The radio buttons for selecting location
  stateButton = location => {
    return (
      <View style={stateStyle(constants.states[location])}>
        <Text
          style={{ textAlign: "center" }}
          onPress={() => {
            this.setState({ location: constants.states[location] });
            this.updateResults();
          }}
        >
          {constants.states[location]}
        </Text>
      </View>
    );
  };

  //this is the layout for each of the filter options. To be populated with data relevant to the each filter
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
            {props.showReset && (
              <IconMCI
                name="close"
                size={20}
                color="#333"
                onPress={() => {
                  switch (props.filterName) {
                    case "Breed":
                      this.setState({ breed: null });
                      this.updateResults();
                      break;
                    case "Location":
                      this.setState({ location: null });
                      this.updateResults();
                      break;
                    case "Price":
                      this.setState({ priceMin: null });
                      this.setState({ priceMax: null });
                      this.updateResults();
                      break;
                  }
                }}
              />
            )}
          </View>
          {props.filterOptions}
        </View>
      </View>
    );
  };

  render() {
    //the modal selector for choosing a breed
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
            this.updateResults();
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

    //selected state has to look different to every other state
    stateStyle = state => {
      return this.state.location === state
        ? styles.selectedState
        : styles.state;
    };

    //custom radio buttons for selecting location
    const locationOptions = (
      <View style={styles.statesWrapper}>
        <View style={styles.topRowStates}>
          {this.stateButton(0)}
          {this.stateButton(1)}
          {this.stateButton(3)}
          {this.stateButton(6)}
        </View>
        <View style={styles.bottomRowStates}>
          {this.stateButton(2)}
          {this.stateButton(4)}
          {this.stateButton(5)}
          {this.stateButton(7)}
        </View>
      </View>
    );

    //selectors for choosing price range
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
                this.updateResults();
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
                this.updateResults();
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

    //everytime user chooses a filter option the number of matches gets updated
    const matches = (
      <View style={styles.matchesCountWrapper}>
        <View style={styles.matchesLabels}>
          <Text>Exact Matches:</Text>
          <Text>Close Matches:</Text>
        </View>
        <View style={styles.matchesValues}>{this.matchData()}</View>
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
          filterOptions: breedOptions,
          showReset: this.state.breed === null ? false : true
        })}
        {/* location selector */}
        {this.filterOptionSkeleton({
          icon: locationIcon,
          filterName: "Location",
          filterOptions: locationOptions,
          showReset: this.state.location === null ? false : true
        })}
        {/* price selector */}
        {this.filterOptionSkeleton({
          icon: priceIcon,
          filterName: "Price",
          filterOptions: priceOptions,
          showReset:
            this.state.priceMin === null
              ? this.state.priceMax === null
                ? false
                : true
              : true
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
    searchResults: state.searchResults,
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
