import React from "react";
import EsriMap from "./EsriMap";
import List from "./List";
import Options from "./Options";
import { Row, Col } from "reactstrap";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    // lifted state to Search component
    // pass functions down to children as props to modify the state
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      options: {
        radius: 5,
        units: "miles",
        // add more options
      },
      results: [], // the resulting features of the search
      height: 0, // the height of the map and list components, calculated depending on the size of the browser window
      searched: false, // should the list be populated
      selected: {} // which feature was clicked on from the List widget. Zooms to the point on the map, and should highlight if I can get it to work properly
    };
  }

  componentDidMount() {
     // set height depending on how big the window is
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  handleOptionsChange(o) {
    // when the options are changed in the 'Refine Search' menu, clear the results and the list
    this.setState({ options: o, results: [], searched: false });
  }

  handleResultsChange(r) {
    // when results are populated from the search, show them in the List
    this.setState({ results: r, searched: true });
  }

  handleSelection(s) {
    // when a feature is clicked on from the List, zoom to it in the map
    this.setState({ selected: s });
  }

  render() {
    return (
      <div
      style={{height: '70vh'}}
        ref={(divElement) => {
          this.divElement = divElement;
        }}
      >
        <Row>
          <Col md={8}>
            <Options
              buttonLabel="Refine Search"
              options={this.state.options}
              results={this.state.results}
              onOptionsChange={this.handleOptionsChange}
            />
          </Col>
          <Col md={4}>
            {this.state.searched ? (
              <React.Fragment>
                There is a total of <b>{this.state.results.length}</b> hospitals within{" "}
                <b>{this.state.options.radius} {this.state.options.units}</b>.
              </React.Fragment>
            ) : (
              "Search a location to find the nearest hositals."
            )}
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <EsriMap
              options={this.state.options}
              onResultsChange={this.handleResultsChange}
              h={this.state.height}
              selected={this.state.selected}
            />
          </Col>
          <Col md={4}>
            <List
              results={this.state.results}
              options={this.state.options}
              h={this.state.height}
              onSelection={this.handleSelection}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
