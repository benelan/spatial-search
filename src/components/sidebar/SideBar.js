import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = (props) => (
  <div className={classNames("sidebar", { "is-open": props.isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={props.toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Menu</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Search
          </NavLink>
        </NavItem>
        <SubMenu title="Info" icon={faInfoCircle} items={submenus[0]} />
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "About",
      target: "about",
    },
    {
      title: "Contact",
      target: "contact",
    }
  ]
];

export default SideBar;
