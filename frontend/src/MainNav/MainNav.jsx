import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    //this.activateContent = this.activateContent.bind(this)
    this.state = {
      dropdownOpen: false
    };
  }
  

  activateContent(val){

    if(this.props.onChangeContent){
      this.props.onChangeContent(val)
      
    }
  }

 
 
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink href="#" onClick={()  => this.activateContent("map")} >Map</NavLink>
          </NavItem>
          <NavItem>
          <NavLink href="#" onClick={()  => this.activateContent("dash")} >Dashboard</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}