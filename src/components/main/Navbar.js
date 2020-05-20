import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faGithubSquare,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Nav, Navbar, NavbarBrand, NavLink, Button, Row } from "reactstrap";

export default (props) => {
  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button
        size="sm"
        color="success"
        onClick={props.toggle}
        style={{ marginRight: "20px" }}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarBrand className="center d-none d-md-block d-lg-block d-xl-block">
        Find Nearest Hospitals
      </NavbarBrand>
      <NavbarBrand className="center d-block d-sm-block d-md-none">
        Hospitals
      </NavbarBrand>
      <Nav className="mr-auto" navbar />
      <Row style={{ margin: "-8px" }}>
        <NavLink
          style={{ color: "#5cb85c" }}
          href={"https://www.linkedin.com/in/benelan"}
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </NavLink>
      </Row>
      <Row>
        <NavLink
          href={"https://github.com/benelan"}
          style={{ color: "#5cb85c" }}
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </NavLink>
      </Row>
    </Navbar>
  );
};
