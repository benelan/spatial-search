import React from "react";
import EsriMap from "./EsriMap";
import List from "./List";
import Options from "./Options";
import { Row, Col } from "reactstrap";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      options: {
        radius: 5,
        units: "miles",
        // add more options
      },
      results: [],
      height: 0,
      searched: false,
      selected: {}
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  handleOptionsChange(o) {
    this.setState({ options: o, results: [], searched: false });
  }

  handleResultsChange(r) {
    this.setState({ results: r, searched: true });
  }

  handleSelection(s) {
    this.setState({ selected: s });
    console.log(this.state.selected)
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
                There is a total of {this.state.results.length} hospitals within{" "}
                {this.state.options.radius} {this.state.options.units}.
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
