import React from "react";
import { Col, Row, ListGroup, ListGroupItem, Button } from "reactstrap";

export default class About extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Row>
        <Col md={{ size: 5, offset: 1 }}>
          <h4 className="text-center">About the Sample</h4>
          <p>This sample was created to showcase the <a href="https://developers.arcgis.com/javascript/" style={{color: "blue"}}>ArcGIS API for JavaScript</a> in comparison to Mapbox.</p>
          <p>An <a href="https://mychildcare.ca.gov/" style={{color: "blue"}}>application</a> created using Mapbox was provided, and I attempted to replicate some of the UI and functionality.</p>
          <p>My colleague also created an <a href="https://banuelosj.github.io/nearme-route-jsapi/" style={{color:"blue"}}>application</a> to demonstrate a more map-centric solution.</p>
        </Col>
        <Col md={{ size: 4, offset: 1 }}>
          <h4 className="text-center">About Me</h4>
          <p>My name is Ben Elan, and I am a Developer Products Support Specialist at Esri. </p>
        </Col>
      </Row>
    );
  }
}
