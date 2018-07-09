import React, { Component } from 'react';
import './SideBar.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'; 


const nodes = [{
    value: 'Drenthe',
    label: 'Drenthe',
    children: [
        { value: 'Assen', label: 'Assen' },
        { value: 'Coevorden', label: 'Coevorden' },
    ],
}];

class SideBar extends Component {

    constructor() {
        super();

        this.state = {
            checked: [],
            expanded: [],
        };
    }

  renderedSideBar(){

  }
  render() {
    return (
      // side bar
      // content
      <div className="sideBar">
        <h1 className="title">Open Parking</h1>
        <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                showNodeIcon={false}
                nativeCheckboxes={true}
            />
      </div>
    );
  }
}

export default SideBar;
