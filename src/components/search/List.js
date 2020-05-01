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
      margin: "5px",
      height: "200px"
    };

    const Item = memo(({ index }) => (
      <ListGroupItem style={lgi} tag="button" action>
        <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
        <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
          eget risus varius blandit.
        </ListGroupItemText>
      </ListGroupItem>
    ));

    return (
      <ListGroup>
        <VirtualScroll
          itemCount={50}
          height={500}
          childHeight={200}
          Item={Item}
        />
      </ListGroup>
    );
  }
}
