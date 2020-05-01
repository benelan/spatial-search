import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button } from "reactstrap";

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
      <h4 className="center">Esri Spatial Search Sample with React</h4>
    </Navbar>
  );
};
