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
          Distance: {Math.round((this.props.results[index].attributes.dist + Number.EPSILON) * 100) / 100} {this.props.options.units}
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
