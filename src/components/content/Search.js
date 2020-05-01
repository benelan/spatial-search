import React, { useState } from "react";
import EsriMap from "../search/EsriMap"
import List from "../search/List"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Navbar, Button, NavbarToggler, Collapse } from "reactstrap";

export default (props) => {
  return (
    <div>
        <Row>
            <Col md={8}>
            <EsriMap />
            </Col>
            <Col md={4}>
            <List />
            </Col>
        </Row>
    </div>
  );
};
