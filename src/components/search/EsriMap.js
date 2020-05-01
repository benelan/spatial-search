import React from "react";
import { loadModules, setDefaultOptions } from "esri-loader";

export default class EsriMap extends React.Component {
  state = {
    map: null,
    view: null
  };

  componentDidMount() {
    setDefaultOptions({ css: true });
    this.loadMap();
  }

  loadMap() {
    const that = this;
    loadModules(["esri/Map", "esri/views/MapView"]).then(([Map, MapView]) => {
      that.state.map = new Map({
        basemap: "dark-gray",
      });

      that.state.view = new MapView({
        container: "viewDiv",
        center: [-121.6169, 39.1404],
        zoom: 4,
        map: that.state.map,
      });
    });
  }

  render() {
    const mD = {
      width: "100%",
      height: "500px"
    };
    return (
      <div id="viewDiv" style={mD}></div>
    )
  }
}
