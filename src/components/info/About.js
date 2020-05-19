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
    const marginSides = {
      marginLeft: "15px",
      marginRight: "15px",
    };
    return (
      <React.Fragment>
        <Row style={marginSides}>
          <Col md={{ size: 6, offset: 0 }}>
            <h4 className="text-center">About the Sample</h4>
            <p>
              This sample was created to showcase the{" "}
              <a
                href="https://developers.arcgis.com/javascript/"
                style={{ color: "blue" }}
                target="_blank"
              >
                ArcGIS API for JavaScript
              </a>{" "}
              in comparison to Mapbox.
            </p>
            <p>
              The goal was to replicate some of the UI and functionality of an{" "}
              <a href="https://mychildcare.ca.gov/" style={{ color: "blue" }}>
                application
              </a>{" "}
              created using Mapbox.
            </p>
            <p>
              My colleague also created an{" "}
              <a
                href="https://banuelosj.github.io/nearme-route-jsapi/"
                style={{ color: "blue" }}
                target="_blank"
              >
                application
              </a>{" "}
              to demonstrate a more map-centric solution.
            </p>
          </Col>
          <Col md={{ size: 6, offset: 0 }}>
            <h4 className="text-center">About The Data</h4>
            <p>
              The hospital data in this project uses the{" "}
              <a
                href="https://www.usgs.gov/core-science-systems/ngp/board-on-geographic-names"
                target="_blank"
                style={{ color: "blue" }}
              >
                U.S. Geographic Names Information System
              </a>
              , which is the federal standard.{" "}
            </p>
            <p>
              <a
                href="https://www.arcgis.com/home/item.html?id=f114757725a24d8d9ce203f61eaf8f75"
                target="_blank"
                style={{ color: "blue" }}
              >
                The data was obtained from Esri
              </a>
              , and then published in May 2020.{" "}
            </p>{" "}
            <p>
              The accuracy of the data cannot be confirmed past the publication date.
              However, hospital locations remain relatively static.
            </p>
          </Col>
        </Row>

        <Row style={marginSides}>
          <Col md={{ size: 12, offset: 0 }} style={{ marginTop: "30px" }}>
            <h4 className="text-center">About the Developer</h4>
            <div className="text-center">
              This app was created by Ben Elan. Ben is a Developer Products
              Support Specialist at Esri with a focus in web and mobile
              development.
            </div>
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
      </React.Fragment>
    );
  }
}
