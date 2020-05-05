import React from "react";
import { Col, Row, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
export default class About extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Row>
        <Col md={{ size: 5, offset: 1 }}>
          <h4 className="text-center">About the Sample</h4>
          <p>
            This sample was created to showcase the{" "}
            <a
              href="https://developers.arcgis.com/javascript/"
              style={{ color: "blue" }}
            >
              ArcGIS API for JavaScript
            </a>{" "}
            in comparison to Mapbox.
          </p>
          <p>
            An{" "}
            <a href="https://mychildcare.ca.gov/" style={{ color: "blue" }}>
              application
            </a>{" "}
            created using Mapbox was provided, and I attempted to replicate some
            of the UI and functionality.
          </p>
          <p>
            My colleague also created an{" "}
            <a
              href="https://banuelosj.github.io/nearme-route-jsapi/"
              style={{ color: "blue" }}
            >
              application
            </a>{" "}
            to demonstrate a more map-centric solution.
          </p>
        </Col>
        <Col md={{ size: 4, offset: 1 }}>
          <h4 className="text-center">About Me</h4>
          <p>
            I am a Developer Products Support Specialist at Esri with a focus in
            web and mobile development.
          </p>
          <Row style={{ marginTop: "50px" }}>
            <Col>
              <NavLink
                className="center"
                href={"https://www.linkedin.com/in/benelan"}
              >
                <FontAwesomeIcon size="4x" icon={faLinkedinIn} />
              </NavLink>
            </Col>
            <Col>
              <NavLink className="center" href={"https://github.com/benelan"}>
                <FontAwesomeIcon size="4x" icon={faGithubSquare} />
              </NavLink>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
