import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

<<<<<<< HEAD
=======
 
 
>>>>>>> staticvisuals
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink href="#" active>Map</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" active>Dashboard</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}