import React from "react";
import { loadModules, setDefaultOptions } from "esri-loader";
export default class EsriMap extends React.Component {
  state = {
    map: null,
    view: null,
    search: null,
    graphicsLayer: null,
    graphicsLayerView: null,
    //highlight: null,
  };

  componentDidMount() {
    setDefaultOptions({ css: true });
    this.loadMap();
  }

  componentDidUpdate(nextProps) {
    const { selected } = this.props;

    if (nextProps.selected !== selected) {
      if (selected) {
        this.state.view.goTo({ target: selected.geometry, zoom: 15 });

        // highlight code below not working.
        // It isn't clearing the previous highlighted points.
        // possible because highlight is a state?

        // if (this.state.highlight) {
        //   this.state.highlight.remove();
        //   console.log(1)
        //   this.setState({ highlight: null });
        // }
        // let sg = this.state.graphicsLayer.graphics.items.filter(function (g) {
        //   return g.geometry === selected.geometry;
        // });
        // if (sg.length > 0) {
        // this.state.graphicsLayerView.highlight(sg[0]);
        // this.setState({highlight: this.state.graphicsLayerView.highlight(sg[0])})
        // }
      }
    }
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
      "esri/geometry/Polyline",
    ]).then(
      ([
        MapView,
        EsriMap,
        FeatureLayer,
        GraphicsLayer,
        Graphic,
        geometryEngine,
        Search,
        Polyline,
      ]) => {
        that.state.graphicsLayer = new GraphicsLayer();

        const facilitiesLayer = new FeatureLayer({
          url:
            "https://services.arcgis.com/Wl7Y1m92PbjtJs5n/ArcGIS/rest/services/hospitalTestData/FeatureServer/0",
          outFields: ["*"],
        });

        that.state.map = new EsriMap({
          basemap: "streets",
          layers: [that.state.graphicsLayer],
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

        // don't zoom to search location
        that.state.search.goToOverride = () => {
          return;
        };

        that.state.view.when(() => {
          that.state.view.ui.add(that.state.search, {
            position: "top-right",
            index: 2,
          });
          // run query after search completes
          // use search result location as the query center location
          that.state.search.on("search-complete", (event) =>
            findFacilities(
              event.results[0].results[0].feature.geometry,
              facilitiesLayer
            )
          );

          that.state.view
            .whenLayerView(that.state.graphicsLayer)
            .then((layerView) => {
              that.state.graphicsLayerView = layerView;
            });
        });

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
              layer.queryExtent(query).then(function (results) {
                that.state.view.goTo(results.extent); // go to the extent of the results satisfying the query
              });
              let res = [];
              results.features.forEach((feature) => {
                const dist = getDistance(loc, feature.geometry);

                feature.attributes.dist = dist;
                res.push(feature);
              });
              res.sort((a, b) =>
                a.attributes.dist > b.attributes.dist ? 1 : -1
              );
              displayLocations(res);
              that.props.onResultsChange(res);
            } else {
              that.props.onResultsChange([]);
              that.state.view.goTo({ target: loc, zoom: 10 });
            }
          });
        }

        /***
         * To calculate distance between two points using geodesic length
         * Need to create a polyline between the two points, then calculate
         * The geodesic lenght of the polyline
         ***/
        function getDistance(searchPoint, facilityLocation) {
          var polyline = new Polyline({
            paths: [
              [searchPoint.longitude, searchPoint.latitude],
              [facilityLocation.longitude, facilityLocation.latitude],
            ],
            spatialReference: { wkid: 4326 },
          });

          return geometryEngine.geodesicLength(
            polyline,
            that.props.options.units
          );
        }

        function displayLocations(features) {
          //clear existing graphics first
          that.state.graphicsLayer.removeAll();

          // var symbol = {
          //   type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
          //   url: ,
          //   width: "64px",
          //   height: "64px"
          // };

          const facilitySymbol = {
            type: "simple-marker",
            path:
              "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            // path: "M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0zM16 14.402A4.4 4.4 0 0 1 11.601 10a4.4 4.4 0 1 1 8.798 0A4.4 4.4 0 0 1 16 14.402z",
            color: "#9900ff",
            size: "16px",
          };

          features.forEach((feature) => {
            const graphic = new Graphic({
              geometry: feature.geometry,
              symbol: facilitySymbol,
            });
            graphic.popupTemplate = {
              title: feature.attributes.NAME,
              content:
                Math.round((feature.attributes.dist + Number.EPSILON) * 100) /
                  100 +
                " " +
                that.props.options.units,
            };
            that.state.graphicsLayer.add(graphic);
          });
        }
      }
    );
  }

  render() {
    const mD = {
      width: "100%",
      height: this.props.h,
      borderRadius: "1px",
      border: "1px solid lightgrey",
    };
    return <div id="viewDiv" style={mD}></div>;
  }
}
