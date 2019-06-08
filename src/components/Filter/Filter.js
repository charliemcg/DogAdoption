import React, { Component } from "react";
import { SafeAreaView, Text, View } from "react-native";
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

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breed: this.props.searchFilters.breed,
      filter: this.props.searchFilters.location,
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

  render() {
    // const breedSelector = (
    //   <View style={styles.optionWrapper}>
    //     <View style={styles.optionWrapperLeft}>
    //       <View style={styles.iconWrapper}>
    //         <IconAwesome name="dog" size={45} color={colors.primary} />
    //       </View>
    //       <View style={styles.textWrapper}>
    //         <Text style={styles.nameText}>Breed</Text>
    //       </View>
    //     </View>
    //     <View style={styles.optionWrapperRight}>
    //       <View style={styles.resetBtnWrapper}>
    //         <IconAwesome name="window-close" size={20} color={colors.primary} />
    //       </View>
    //       {/* consider using a picker instead */}
    //       <ModalSelector
    //         style={styles.modalSelector}
    //         data={this.props.breeds}
    //         initValue={
    //           this.state.breed === null ? strings.select : this.state.breed
    //         }
    //         onChange={option => {
    //           this.setState({ breed: option.label });
    //         }}
    //         selectTextStyle={{
    //           color: colors.dark
    //         }}
    //         optionTextStyle={{
    //           color: colors.notQuiteBlack
    //         }}
    //       />
    //     </View>
    //   </View>
    // );

    const breedSelector = (
      <View style={styles.optionWrapper}>
        <View style={styles.optionWrapperLeft}>
          <View style={styles.iconWrapper}>
            <IconAwesome name="dog" size={45} color={colors.primary} />
          </View>
        </View>
        <View style={styles.optionWrapperRight}>
          <View style={styles.topRightWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.nameText}>Breed</Text>
            </View>
            <View style={styles.resetBtnWrapper}>
              <IconAwesome
                name="window-close"
                size={20}
                color={colors.primary}
              />
            </View>
          </View>
          {/* consider using a picker instead */}
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
      </View>
    );

    const locationSelector = (
      <View style={styles.optionWrapper}>
        <View style={styles.optionWrapperLeft}>
          <View style={styles.iconWrapper}>
            <IconEntypo name="location-pin" size={45} color={colors.primary} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.nameText}>Location</Text>
          </View>
        </View>
        <View style={styles.optionWrapperRight}>
          <View style={styles.resetBtnWrapper}>
            <IconAwesome name="window-close" size={20} color={colors.primary} />
          </View>
          <View style={styles.statesWrapper}>
            <View style={styles.topRowStates}>
              <Text>WA</Text>
              <Text>NT</Text>
              <Text>QLD</Text>
              <Text>VIC</Text>
            </View>
            <View style={styles.bottomRowStates}>
              <Text>SA</Text>
              <Text>NSW</Text>
              <Text>ACT</Text>
              <Text>TAS</Text>
            </View>
          </View>
          {/* <ModalSelector
            style={styles.breedSelector}
            data={this.locations()}
            initValue={
              this.state.location === null
                ? strings.select
                : this.state.location
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
          /> */}
        </View>
      </View>
    );

    const priceSelector = (
      <View style={styles.optionWrapper}>
        <View style={styles.optionWrapperLeft}>
          <View style={styles.iconWrapper}>
            <IconAwesome name="dollar-sign" size={45} color={colors.primary} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.nameText}>Price</Text>
          </View>
        </View>
        <View style={styles.optionWrapperRight}>
          <View style={styles.resetBtnWrapper}>
            <IconAwesome name="window-close" size={20} color={colors.primary} />
          </View>
          <View style={styles.priceWrapper}>
            <View style={styles.minPriceWrapper}>
              <Text>Price min.</Text>
              <ModalSelector
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
            <View style={styles.maxPriceWrapper}>
              <Text>Price max.</Text>
              <ModalSelector
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
      </View>
    );

    const matches = (
      <View style={styles.matchesCountWrapper}>
        <Text>Exact Matches: 1234</Text>
        <Text>Close Matches: 5678</Text>
      </View>
    );

    const updateButton = (
      <TouchableHighlight
        onPress={() => this.handleUpdate()}
        style={styles.updateBtn}
      >
        <Text>{strings.updateSearch}</Text>
      </TouchableHighlight>
    );

    return (
      <SafeAreaView style={styles.parent}>
        {/* breed selector */}
        {breedSelector}
        {/* location selector */}
        {locationSelector}
        {/* price selector */}
        {priceSelector}
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
