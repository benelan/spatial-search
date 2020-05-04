import React, { memo } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import VirtualScroll from "./VirtualScroll";

export default class List extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    const lgi = {
      marginBottom: "5px",
      height: "200px",
    };

    const Item = memo(({ index }) => (
      <ListGroupItem style={lgi} tag="button" action>
        <ListGroupItemHeading>
          {this.props.results[index].attributes.NAME}
        </ListGroupItemHeading>
        <ListGroupItemText>
          FIPS: {this.props.results[index].attributes.STCTYFIPS}
          <br></br>
          x: {this.props.results[index].geometry.x}
          <br></br>
          y: {this.props.results[index].geometry.y}
        </ListGroupItemText>
      </ListGroupItem>
    ));

    return (
      <ListGroup>
        <VirtualScroll
          itemCount={this.props.results.length}
          height={500}
          childHeight={205}
          Item={Item}
        />
      </ListGroup>
    );
  }
}
