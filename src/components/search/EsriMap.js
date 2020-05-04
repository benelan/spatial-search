import React from "react";
import { loadModules, setDefaultOptions } from "esri-loader";

export default class EsriMap extends React.Component {
  state = {
    map: null,
    view: null,
  };

  componentDidMount() {
    setDefaultOptions({ css: true });
    this.loadMap();
  }

  loadMap() {
    const that = this;
    loadModules([ 
    "esri/views/MapView",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/geometry/geometryEngine",]).then(([ 
      MapView,
      EsriMap,
      FeatureLayer,
      GraphicsLayer,
      Graphic,
      geometryEngine]) => {
      const radius = that.props.options.radius;
      const distanceUnits = "miles";
      const graphicsLayer = new GraphicsLayer();

      const facilitiesLayer = new FeatureLayer({
        url:
          "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
        outFields: ["*"],
      });

      that.state.map = new EsriMap({
        basemap: "streets",
        layers: [graphicsLayer],
      });

      that.state.view = new MapView({
        container: "viewDiv",
        map: that.state.map,
        center: [-118.165526, 34.032336],
        zoom: 12,
      });

      that.state.view.on("click", clickHandler);

      function clickHandler(event) {
        that.state.view.hitTest(event).then((response) => {
          if (response.results.length) {
            const graphic = response.results.filter((result) => {
              return result.graphic.layer === facilitiesLayer;
            })[0].graphic;
          } else {
            const mapPoint = that.state.view.toMap(response.screenPoint);
            addPointToMap(mapPoint);
            // create the buffer to display and for the query
            const buffer = addBuffer(mapPoint);
            findFacilities(buffer, facilitiesLayer);
          }
        });
      }

      function addPointToMap(point) {
        //clear existing graphics
        if (that.state.view.graphics.length > 0) {
          that.state.view.graphics.removeAll();
        }

        const locationSymbol = {
          type: "simple-marker",
          path:
            "M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0z",
          color: "#de2900",
          size: "35px",
        };

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: locationSymbol,
        });

        that.state.view.graphics.add(pointGraphic);
      }

      function addBuffer(point) {
        const polySym = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [140, 140, 222, 0.5],
          outline: {
            color: [0, 0, 0, 0.5],
            width: 2,
            style: "dash",
          },
        };

        const buffer = geometryEngine.geodesicBuffer(
          point,
          radius,
          distanceUnits
        );

        const bufferGraphic = new Graphic({
          geometry: buffer,
          symbol: polySym,
        });

        that.state.view.graphics.add(bufferGraphic);
        return buffer;
      }

      // query nearby facilities within a certain radious
      function findFacilities(buffer, layer) {
        const query = layer.createQuery();
        query.returnGeometry = true;
        //  query.distance = radius;
        //  query.units = distanceUnits;
        query.outFields = ["*"];
        query.geometry = buffer;

        layer.queryFeatures(query).then((results) => {
          displayLocations(results.features);
          //populateCards();
        });
      }

      function displayLocations(features) {
        //clear existing graphics first
        graphicsLayer.removeAll();

        const facilitySymbol = {
          type: "simple-marker",
          path:
            "M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0zM16 14.402A4.4 4.4 0 0 1 11.601 10a4.4 4.4 0 1 1 8.798 0A4.4 4.4 0 0 1 16 14.402z",
          color: "#0079C1",
          size: "15px",
        };

        features.forEach((feature) => {
          const graphic = new Graphic({
            geometry: feature.geometry,
            symbol: facilitySymbol,
          });
          graphicsLayer.add(graphic);
        });
      }
    });
  }

  render() {
    const mD = {
      width: "100%",
      height: "500px",
      borderRadius: "1px",
      border: "1px solid lightgrey",
    };
    return <div id="viewDiv" style={mD}></div>;
  }
}
