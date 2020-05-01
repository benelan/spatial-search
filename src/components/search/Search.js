import React, { useState } from "react";
import EsriMap from "./EsriMap"
import List from "./List"
import { Row, Col } from "reactstrap";

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
