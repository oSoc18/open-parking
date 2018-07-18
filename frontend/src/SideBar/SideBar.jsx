import React, { Component } from 'react';
import './SideBar.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import LogoImg from './images/logo.png';

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.initFilters()
        this.state = {
            checked: [],
            expanded: [],
        };
        this.handleVisibleFacilities = this.handleVisibleFacilities.bind(this);
    }

    initFilters(){
        let jsn = {}
        this.visibleFacilities =  ["parkAndRide", "permit", "garage", "carpool", "otherPlaces"]
    
        

    
    }

    handleVisibleFacilities(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let temp = this.visibleFacilities
       
            

            
                var index = temp.indexOf(name);    // <-- Not supported in <IE9
                if (index !== -1) {
                    temp.splice(index, 1);
                }
            
            else{
                temp.push(name)
            }
            this.visibleFacilities = temp
        


        if(this.props.onChangeVisFacilities)
            this.props.onChangeVisFacilities(temp)

    
      }

    renderedSideBar() {

    }

    render() {
        return (
            // side bar
            // content

            <div className="sideBar">
                <h1 className="title">Open Parking</h1>
                <img id="logo" src={LogoImg} alt="logo" width="31" height="40"></img>
                <hr></hr>
                <h4 className="title">Visible facilities</h4>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="parkAndRide" name="parkAndRide"
                        value="parkAndRide" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
                    <label for="parkAndRide">Park + Ride</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="permit" name="permit"
                        value="permit" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
                    <label for="permit">Permit</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="garage" name="garage"
                        value="garage" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
                    <label for="garage">Garage</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="carpool" name="carpool"
                        value="carpool" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
                    <label for="carpool">Carpool</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="otherPlaces" name="otherPlaces"
                        value="otherPlaces" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
                    <label for="otherPlaces">Other places</label>
                </div>

                <h4 className="title">Available information</h4>

                <div>
                    <input class="styled-checkbox" type="checkbox" id="capacity" name="capacity"
                        value="capacity" />
                    <label for="capacity">Capacity</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="tariffs" name="tariffs"
                        value="tariffs" />
                    <label for="tariffs">Tariffs</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="restrictions" name="restrictions"
                        value="restrictions" />
                    <label for="restrictions">Restrictions</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="openingHours" name="openingHours"
                        value="openingHours" />
                    <label for="openingHours">Opening hours</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="contactData" name="contactData"
                        value="contactData" />
                    <label for="contactData">Contact data</label>
                </div>
            </div>
        );
    }
}

export default SideBar;
