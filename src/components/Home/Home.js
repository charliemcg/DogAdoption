import React, { Component } from "react";
import { View, Text, Alert, Image } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import strings from "../../strings";
import ModalSelector from "react-native-modal-selector";
import colors from "../../colors";
import constants from "../../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //api is retrieving data
      loading: false,
      //list of selectable breeds
      breeds: [],
      //breed that user chose
      selectedBreed: "select...",
      //images of dogs of the selected breed
      results: []
    };
  }

  componentDidMount() {
    this.getBreeds();
  }

  getBreeds = () => {
    fetch(constants.api.breedsList)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        let breedsArr = [];
        let index = 0;
        for (var key in data.message) {
          breedsArr.push({ key: index++, label: key });
        }
        this.setState({
          loading: false,
          breeds: breedsArr
        });
      })
      .catch(e => console.log(e));
  };

  //images of dogs of the chosen breed
  getImages = option => {
    fetch(
      `${constants.api.imagesStart}${option.label}${constants.api.imagesEnd}`
    )
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.setState({
          results: data.message
        });
      })
      .catch(e => console.log(e));
    this.setState({
      selectedBreed: option.label
    });
  };

  render() {
    return (
      <View style={styles.parent}>
        <Text>{strings.exampleStringOne}</Text>
        <Text>{strings.exampleStringTwo}</Text>
        <ModalSelector
          data={this.state.breeds}
          initValue={this.state.selectedBreed}
          onChange={option => {
            this.getImages(option);
          }}
        />
        <Image
          style={{ height: 275, width: 275, backgroundColor: colors.light }}
          source={{
            uri: this.state.results[0]
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    //props go here...
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
)(Home);
