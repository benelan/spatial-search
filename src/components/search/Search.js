import React from "react";
import EsriMap from "./EsriMap";
import List from "./List";
import Options from "./Options";
import classnames from "classnames";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    // lifted state to Search component
    // pass functions down to children as props to modify the state
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      options: {
        radius: 5,
        units: "miles",
        // add more options
      },
      results: [], // the resulting features of the search
      height: 0, // the height of the map and list components, calculated depending on the size of the browser window
      searched: false, // should the list be populated
      selected: {}, // which feature was clicked on from the List widget. Zooms to the point on the map, and should highlight if I can get it to work properly
      activeTab: "1",
      mobile: false,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  componentDidMount() {
    // set height depending on how big the window is
    const height = this.divElement.clientHeight;
    this.setState({ height });
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      this.setState({ mobile: true });
    }
  }

  handleOptionsChange(o) {
    // when the options are changed in the 'Refine Search' menu, clear the results and the list
    this.setState({ options: o, results: [], searched: false, activeTab: "1" });
  }

  handleResultsChange(r) {
    // when results are populated from the search, show them in the List
    this.setState({ results: r, searched: true });
  }

  handleSelection(s) {
    // when a feature is clicked on from the List, zoom to it in the map
    this.setState({ selected: s, activeTab: "1" });
  }

  render() {
    return (
      <div
        style={{ height: "70vh" }}
        ref={(divElement) => {
          this.divElement = divElement;
        }}
      >
        <Row>
          <Col md={8}>
            <Options
              buttonLabel="Refine Search"
              options={this.state.options}
              results={this.state.results}
              onOptionsChange={this.handleOptionsChange}
            />
          </Col>
          <Col md={4}>
            {this.state.searched ? (
              <React.Fragment>
                There is a total of <b>{this.state.results.length}</b> hospitals
                within{" "}
                <b>
                  {this.state.options.radius} {this.state.options.units}
                </b>
                .
              </React.Fragment>
            ) : (
              "Search a location to find the nearest hositals."
            )}
          </Col>
        </Row>
        {this.state.mobile ? (
       <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1",
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Map
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2",
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              List
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12">
                <EsriMap
                  options={this.state.options}
                  onResultsChange={this.handleResultsChange}
                  h={this.state.height*.8}
                  selected={this.state.selected}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md="12">
                <List
                  results={this.state.results}
                  options={this.state.options}
                  h={this.state.height*.8}
                  onSelection={this.handleSelection}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        </React.Fragment>
        ) : (
          <Row>
          <Col md={8}>
            <EsriMap
              options={this.state.options}
              onResultsChange={this.handleResultsChange}
              h={this.state.height}
              selected={this.state.selected}
            />
          </Col>
          <Col md={4}>
            <List
              results={this.state.results}
              options={this.state.options}
              h={this.state.height}
              onSelection={this.handleSelection}
            />
          </Col>
        </Row>


        )}
      </div>
    );
  }
}
