import React, { memo } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
} from "reactstrap";
import VirtualScroll from "./VirtualScroll";

export default class List extends React.Component {
  render() {
    const lgi = {
      marginBottom: "5px",
      height: "200px",
    };

    const Item = memo(({ index }) => (
      <ListGroupItem
        style={lgi}
        tag="button"
        action
        onClick={() => {
          this.props.onSelection(this.props.results[index]);
        }}
      >
        <ListGroupItemHeading>
          {this.props.results[index].attributes.NAME}
        </ListGroupItemHeading>
        <ListGroupItemText>
          <Row>
            <Col md={8}>
              <Button
                style={{ marginTop: "10px" }}
                color="success"
                onClick={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${this.props.results[index].geometry.latitude},${this.props.results[index].geometry.longitude}`;
                  window.open(url, "_blank");
                }}
              >
                Directions
              </Button>
            </Col>
            <Col md={4} className="float-right">
                {Math.round(
                  (this.props.results[index].attributes.dist + Number.EPSILON) *
                    100
                ) / 100}{" "}
                {this.props.options.units}
            </Col>
          </Row>
        </ListGroupItemText>
      </ListGroupItem>
    ));

    return (
      <ListGroup>
        <VirtualScroll
          itemCount={this.props.results.length}
          height={this.props.h}
          childHeight={205}
          Item={Item}
        />
      </ListGroup>
    );
  }
}
