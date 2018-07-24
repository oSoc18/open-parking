import React, { Component } from 'react';
import './SideBar.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import LogoImg from './images/logo.png';

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.initFilters();
        this.state = {
            checked: [],
            expanded: [],
        };
        this.handleVisibleFacilities = this.handleVisibleFacilities.bind(this);
        this.handleInformation = this.handleInformation.bind(this);
        this.handleExtras = this.handleExtras.bind(this);

        //this.handleInformationCapacity = this.handleInformationCapacity.bind(this)
    }

    initFilters() {
        let jsn = {};
        this.visibleFacilities = ["parkAndRide", "terrain", "garage", "carpool", "onstreet", "otherPlaces"];
        this.information = {}; // {"capacity": "", "tariffs": "", "restrictions": "", "openingTimes":"", "contactPersons":"", "accessPoint":""};
        this.extras = ["noDynamic", "private", "public"];

    }

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
        const name = target.name;
        let temp = this.visibleFacilities;




        var index = temp.indexOf(name);    // <-- Not supported in <IE9
        if (index !== -1) {
            temp.splice(index, 1);
        }

        else {
            temp.push(name)
        }
        this.visibleFacilities = temp;
        console.log(temp)



        if (this.props.onChangeVisFacilities)
            this.props.onChangeVisFacilities(temp)
    }
    handleExtras(event) {
        const target = event.target;
        const name = target.name;
        let temp = this.extras;




        var index = temp.indexOf(name);    // <-- Not supported in <IE9
        if (index !== -1) {
            temp.splice(index, 1);
        }

        else {
            temp.push(name)
        }
        this.extras = temp;



        if (this.props.onChangeExtras)
            this.props.onChangeExtras(temp)
    }


    handleInformation(event) {
        const target = event.target.children[0];
        const value = target.value;
        const name = target.name;
        let temp = this.information;

        console.log(name);

        if(value !== "unknown"){
            temp[name] = value;
        }else {
            delete temp[name];
        }


        this.information = temp;




        if (this.props.onChangeInformation)
            this.props.onChangeInformation(temp)


    }

    handleInformationCapacity(event) {
        const target = event.target;
        const value = target.value
        const name = target.name;
        let temp = this.information;
        console.log("aaaaaaaaaaaaaaaaaaaa")




        /*var index = temp.indexOf(name);    // <-- Not supported in <IE9
        if (index !== -1) {
            temp.splice(index, 1);
        }

        else {
            temp.push(name)
        }*/
        temp[name] = value
        this.information = temp;
        console.log(this.information)




        if (this.props.onChangeInformation)
            this.props.onChangeInformation(temp)


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
                    <input class="styled-checkbox" type="checkbox" id="terrain" name="terrain"
                        value="terrain" onChange={this.handleVisibleFacilities} defaultChecked={true}/>
                    <label for="terrain">Terrain</label>
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
                    <input class="styled-checkbox" type="checkbox" id="onstreet" name="onstreet"
                           value="onstreet" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="onstreet">Onstreet</label>
                </div>
                <div>
                    <input class="styled-checkbox" type="checkbox" id="otherPlaces" name="otherPlaces"
                        value="otherPlaces" onChange={this.handleVisibleFacilities} defaultChecked={true} />
                    <label for="otherPlaces">Other places</label>
                </div>

                <h4 className="title">Information</h4>
                <div class="three-states-group">
                    <label for="capacity">Capacity</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="capacity" value="false"/></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="capacity" value="unknown" checked/></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="capacity" value="true"/></label>
                    </div>
                </div>
                <div class="three-states-group">
                    <label for="tariffs">Tariffs</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="tariffs" value="false"/></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="tariffs" value="unknown" checked/></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="tariffs" value="true" /></label>
                    </div>
                </div>
                <div class="three-states-group">
                    <label for="restrictions">Restrictions</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="restrictions" value="false" /></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="restrictions" value="unknown" /></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="restrictions" value="true"/></label>
                    </div>
                </div>
                <div class="three-states-group">
                    <label for="openingTimes">Opening Times</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="openingTimes" value="false"/></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="openingTimes" value="unknown" checked/></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="openingTimes" value="true"/></label>
                    </div>
                </div>
                <div class="three-states-group">
                    <label for="contactPersons">Contact Person</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="contactPersons" value="false"/></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="contactPersons" value="unknown" checked/></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="contactPersons" value="true"/></label>
                    </div>
                </div>
                <div class="three-states-group">
                    <label for="accessPoints">Access point</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="accessPoints" value="false"/></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="accessPoints" value="unknown" checked/></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="accessPoints" value="true"/></label>
                    </div>
                </div>
                <div>
                    <label for="dynamic">Dynamic data</label>
                    <div class="btn-group-sm btn-group-toggle float-right" data-toggle="buttons">
                        <label class="btn btn-danger ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="dynamic" value="false"/></label>
                        <label class="btn btn-secondary ml-2 mr-2 p-2 active" onClick={this.handleInformation}><input type="radio" name="dynamic" value="unknown" checked/></label>
                        <label class="btn btn-success ml-2 mr-2 p-2" onClick={this.handleInformation}><input type="radio" name="dynamic" value="true"/></label>
                    </div>
                </div>

                <h4 className="title">Extra</h4>

                <div>
                    <input class="styled-checkbox-extra" type="checkbox" id="private" name="private"
                        value="private" onChange={this.handleExtras} defaultChecked={true} />
                    <label for="private">Private</label>
                </div>
                <div>
                    <input class="styled-checkbox-extra" type="checkbox" id="public" name="public"
                        value="public" onChange={this.handleExtras} defaultChecked={true} />
                    <label for="public">Public</label>
                </div>
            </div>
        );
    }
}

export default SideBar;
