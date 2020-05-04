import React from "react";
import { loadModules, setDefaultOptions } from "esri-loader";

export default class EsriMap extends React.Component {
  state = {
    map: null,
    view: null,
    search: null,
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
      "esri/geometry/geometryEngine",
      "esri/widgets/Search",
    ]).then(
      ([
        MapView,
        EsriMap,
        FeatureLayer,
        GraphicsLayer,
        Graphic,
        geometryEngine,
        Search,
      ]) => {
        const graphicsLayer = new GraphicsLayer();

        const facilitiesLayer = new FeatureLayer({
          url:
            "https://services.arcgis.com/Wl7Y1m92PbjtJs5n/ArcGIS/rest/services/hospitalTestData/FeatureServer/0",
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
          zoom: 10,
        });

        that.state.search = new Search({
          view: that.state.view,
          popupEnabled: false,
        });

        that.state.view.ui.add(that.state.search, {
          position: "top-right",
          index: 2,
        });

        // don't zoom to search location
        that.state.search.goToOverride = () => {
          return;
        };

        // run query after search completes
        // use search result location as the query center location
        that.state.search.on("search-complete", (event) =>
          findFacilities(
            event.results[0].results[0].feature.geometry,
            facilitiesLayer
          )
        );

        // query nearby facilities within a certain radious
        function findFacilities(loc, layer) {
          const query = layer.createQuery();
          query.returnGeometry = true;
          query.distance = that.props.options.radius;
          query.units = that.props.options.units;
          query.outFields = ["*"];
          query.geometry = loc;
          layer.queryFeatures(query).then((results) => {
            if (results.features.length) {
              layer.queryExtent(query).then(function(results){
                that.state.view.goTo(results.extent);  // go to the extent of the results satisfying the query
              });
              displayLocations(results.features);
              that.props.onResultsChange(results.features);
              
            } else {
              console.log("no results returned from query");
            }
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
            graphic.popupTemplate = {
              title: feature.attributes.NAME,
              content: "Add more info here",
            };
            graphicsLayer.add(graphic);
          });
        }
      }
    );
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
