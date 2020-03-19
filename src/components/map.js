import React from "react";
import { VectorMap } from "react-jvectormap";
import Grid from "@material-ui/core/Grid";
import CountryCard from "./Country";

class Map extends React.Component {
  state = {
    countriesCodesArray: [],
    countriesNamesArray: [],
    data: {},
    color: "#48aeef"
  };

  async getCountry(code) {
    try {
      let response = await fetch(
        `https://thevirustracker.com/free-api?countryTotal=${code}`
      );
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  handleColorChange = color => {
    console.log(color.hex);
    this.setState({ color: color.hex });
  };

  handleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleClick = async (e, countryCode) => {
    const { countriesCodesArray, countriesNamesArray } = this.state;
    // console.log(countryCode);
    if (countriesCodesArray.indexOf(countryCode) === -1) {
      this.setState({
        countriesCodesArray: [...countriesCodesArray, countryCode]
      });
      const country = await this.getCountry(countryCode);
      this.setState({
        countriesNamesArray: [...countriesNamesArray, country]
      });
    }
  };

  render() {
    console.log(this.state);
    const { countriesNamesArray, color } = this.state;
    return (
      <Grid container justify="center">
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" // change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "450px"
          }}
          onRegionClick={this.handleClick} // gets the country code
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc" // color for the clicked country
            },
            selectedHover: {}
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: this.state.data, // this is the map data
                scale: ["#146804", color], // your color game's here
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
        <Grid
          spacing={4}
          alignItems="center"
          justify="center"
          container
          item
          xs={10}
        >
          {countriesNamesArray.map((country, i) => {
            const { countrydata } = country;
            console.log(countrydata[0]);
            return (
              <Grid item xs={12} md={4} key={i}>
                <CountryCard {...countrydata[0]} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default Map;
