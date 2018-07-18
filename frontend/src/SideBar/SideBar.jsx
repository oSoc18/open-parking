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

    initFilters() {
        let jsn = {}
<<<<<<< HEAD
        this.visibleFacilities =  ["parkAndRide", "permit", "garage", "carpool", "otherPlaces"]
    
        
=======
        this.visibleFacilities = ["parkAndRide", "residentsOnly", "garage", "company", "otherPlaces"]
    }
>>>>>>> d9299051b1d79cb901c770eaaa5ba577e6d6e7bb

    componentDidMount() {
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
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

        else {
            temp.push(name)
        }
        this.visibleFacilities = temp



        if (this.props.onChangeVisFacilities)
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
                        value="parkAndRide" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="parkAndRide">Park + Ride</label>
                </div>
                <div>
<<<<<<< HEAD
                    <input class="styled-checkbox" type="checkbox" id="permit" name="permit"
                        value="permit" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
=======
                    <input class="styled-checkbox" type="checkbox" id="permit" name="residentsOnly"
                        value="permit" onChange={this.handleVisibleFacilities} defaultChecked={true} />
>>>>>>> d9299051b1d79cb901c770eaaa5ba577e6d6e7bb
                    <label for="permit">Permit</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="garage" name="garage"
                        value="garage" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="garage">Garage</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="carpool" name="carpool"
                        value="carpool" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="carpool">Carpool</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="otherPlaces" name="otherPlaces"
                        value="otherPlaces" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="otherPlaces">Other places</label>
                </div>

                <p></p>

                <button class="collapsible">Information <span id="expand_tag">&#x25BC;</span></button>
                <div class="content">

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

                <h4 className="title">Extra</h4>

                <div>
                    <input class="styled-checkbox-extra" type="checkbox" id="onStreet" name="onStreet"
                        value="onStreet" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="onStreet">On-street</label>
                </div>
                <div>
                    <input class="styled-checkbox-extra" type="checkbox" id="offStreet" name="offStreet"
                        value="offStreet" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="offStreet">Off-street</label>
                </div>
                <div data-tooltip="Get all parkings without dynamic data." data-tooltip-position="right" >
                    <input class="styled-checkbox-extra" type="checkbox" id="noDynamic" name="noDynamic"
                        value="noDynamic" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="noDynamic">No dynamic data</label>
                </div>
                <div>
                    <input class="styled-checkbox-extra" type="checkbox" id="private" name="private"
                        value="private" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="private">Private</label>
                </div>
                <div>
                    <input class="styled-checkbox-extra" type="checkbox" id="public" name="public"
                        value="public" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="public">Public</label>
                </div>
            </div>
        );
    }
}

export default SideBar;
