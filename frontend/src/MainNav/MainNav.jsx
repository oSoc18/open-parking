import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    //this.activateContent = this.activateContent.bind(this)
    this.state = {
      dropdownOpen: false,
      map: "active",
      dash: ""
    };
  }

  activateContent(val){
    if(val === "map"){
      this.setState({map: "active", dash: ""});
    } else {
      this.setState({map: "", dash: "active"});
    }
    if(this.props.onChangeContent){
      this.props.onChangeContent(val)
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem className={this.state.map}>
            <NavLink href="#" onClick={() => this.activateContent("map")} >Map</NavLink>
          </NavItem>
          <NavItem className={this.state.dash}>
            <NavLink href="#" onClick={() => this.activateContent("dash")} >Dashboard</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
