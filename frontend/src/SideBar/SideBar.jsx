import React, { Component } from 'react';
import './SideBar.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

class SideBar extends Component {

    constructor() {
        super();

        this.state = {
            checked: [],
            expanded: [],
        };
    }

    renderedSideBar() {

    }
    render() {
        return (
            // side bar
            // content

            <div className="sideBar">
                <h1 className="title">Open Parking</h1>

                <h4 className="title">Visible facilities</h4>
                <div>
                    <input type="checkbox" id="parkAndRide" name="parkAndRide"
                        value="parkAndRide" />
                    <label for="parkAndRide">Park + Ride</label>
                </div>
                <div>
                    <input type="checkbox" id="residentsOnly" name="residentsOnly"
                        value="residentsOnly" />
                    <label for="residentsOnly">Residents only</label>
                </div>
                <div>
                    <input type="checkbox" id="garage" name="garage"
                        value="garage" />
                    <label for="garage">Garage</label>
                </div>
                <div>
                    <input type="checkbox" id="company" name="company"
                        value="company" />
                    <label for="company">Company</label>
                </div>
                <div>
                    <input type="checkbox" id="otherPlaces" name="otherPlaces"
                        value="otherPlaces" />
                    <label for="otherPlaces">Other places</label>
                </div>

                <h4 className="title">Available information</h4>

                <div>
                    <input type="checkbox" id="capacity" name="capacity"
                        value="capacity" />
                    <label for="capacity">Capacity</label>
                </div>
                <div>
                    <input type="checkbox" id="tariffs" name="tariffs"
                        value="tariffs" />
                    <label for="tariffs">Tariffs</label>
                </div>
                <div>
                    <input type="checkbox" id="restrictions" name="restrictions"
                        value="restrictions" />
                    <label for="restrictions">Restrictions</label>
                </div>
                <div>
                    <input type="checkbox" id="openingHours" name="openingHours"
                        value="openingHours" />
                    <label for="openingHours">Opening hours</label>
                </div>
                <div>
                    <input type="checkbox" id="contactData" name="contactData"
                        value="contactData" />
                    <label for="contactData">Contact data</label>
                </div>
            </div>
        );
    }
}

export default SideBar;
