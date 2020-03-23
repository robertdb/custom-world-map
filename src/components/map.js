import React from "react";
import { VectorMap } from "react-jvectormap";
import Grid from "@material-ui/core/Grid";
import CountryCard from "./Country";
import Alert from "@material-ui/lab/Alert";
import styles from "./styles.css";

class Map extends React.Component {
  state = {
    countriesCodesArray: [],
    countriesNamesArray: [],
    data: {},
    color: "#48aeef",
    error: false
  };

  async getCountry(code) {
    try {
      let response = await fetch(
        `https://thevirustracker.com/free-api?countryTotal=${code}`
      );
      let responseJson = await response.json();
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

    if (countriesCodesArray.indexOf(countryCode) === -1) {
      const country = await this.getCountry(countryCode);
      if (!country) {
        return this.setState({
          error: true
        });
      }
      this.setState({
        countriesCodesArray: [...countriesCodesArray, countryCode],
        countriesNamesArray: [country, ...countriesNamesArray],
        error: false
      });
    }
  };

  render() {
    const { countriesNamesArray, error } = this.state;
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
          onRegionTipShow={(e, tip, code) => console.log("tip", e, tip, code)}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#000",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            selected: {
              fill: "#ccc" // color for the clicked country
            }
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
          {!error &&
            countriesNamesArray.map((country, i) => {
              const { countrydata } = country;

              return (
                <Grid item xs={12} md={4} key={i}>
                  <CountryCard {...countrydata[0]} />
                </Grid>
              );
            })}
        </Grid>
        {error && (
          <Alert severity="error">
            Los servidores estan caidos, si alguno tiene una API estable, por
            favor contactarme a robertdibejar@gmail.com.
          </Alert>
        )}
      </Grid>
    );
  }
}

export default Map;
