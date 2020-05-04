import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, NavbarBrand, Button } from "reactstrap";

export default (props) => {
  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="success" onClick={props.toggle}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarBrand className="center">Find Nearest Hospital</NavbarBrand>
    </Navbar>
  );
};
