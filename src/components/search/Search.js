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
    this.state = {
      options: {
        radius: 5,
        units: 'miles',
        // add more options
      },
      results: [],
    };
  }

  handleOptionsChange(o) {
    this.setState({ options: o });
  }

  handleResultsChange(r) {
    this.setState({ results: r });
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={8}>
            <Options
              buttonLabel="Refine Search"
              options={this.state.options}
              onOptionsChange={this.handleOptionsChange}
            />
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col md={8}>
            <EsriMap
              options={this.state.options}
              onResultsChange={this.handleResultsChange}
            />
          </Col>
          <Col md={4}>
            <List results={this.state.results} />
          </Col>
        </Row>
      </div>
    );
  }
}
