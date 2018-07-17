import React, {Component} from 'react';
import $ from 'jquery';
import L from 'leaflet';
import 'leaflet.markercluster';

import './MapContent.css'

class MapContent extends Component {

    renderMap() {
        let map = L.map('mapid', {
            center: [52.1326, 5.2913],
            zoom: 8
        });
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXNsYWQiLCJhIjoiY2pqbzZiczU0MTV5aTNxcnM5bWY1Nnp4YSJ9.C9UeB-y3MTGiU8Lv7_m5dQ',{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }).addTo(map);
        return map;

    }

    filterMarkers(facilities, cluster){
        Array.prototype.clean = function(deleteValue) {
            for (let i = 0; i < this.length; i++) {
                if (this[i] === deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };
        let offstreetIcon = L.icon({
            iconUrl: require('./markers/parking-blue.png'),
            iconSize: [46, 46],
            iconAnchor: [23, 46],
            popupAnchor: [0, -46]
        });


        let main = this;

        cluster.clearLayers();
        let markersToAdd = facilities.slice(0);
        if(!$("#onstreet").prop("checked")){
            for(let i=0; i<markersToAdd.length; i++){
                if(markersToAdd[i].facilityType === "onstreet"){
                    delete markersToAdd[i];
                }
            }
        }
        markersToAdd.clean(undefined);
        if(!$("#offstreet").prop("checked")){
            for(let i=0; i<markersToAdd.length; i++){
                if(markersToAdd[i].facilityType === "offstreet"){
                    delete markersToAdd[i];
                }
            }
        }
        markersToAdd.clean(undefined);
        if(!$("#dynamic").prop("checked")){
            for(let i=0; i<markersToAdd.length; i++){
                if(markersToAdd[i].dynamicDataUrl === null){
                    delete markersToAdd[i];
                }
            }
        }
        markersToAdd.clean(undefined);
        if(!$("#private").prop("checked")){
            for(let i=0; i<markersToAdd.length; i++){
                if(markersToAdd[i].dynamicDataUrl !== null && markersToAdd[i].limitedAccess === true){
                    delete markersToAdd[i];
                }
            }
        }
        markersToAdd.clean(undefined);
        if(!$("#public").prop("checked")){
            for(let i=0; i<markersToAdd.length; i++){
                if(markersToAdd[i].dynamicDataUrl !== null && markersToAdd[i].limitedAccess === false){
                    delete markersToAdd[i];
                }
            }
        }
        markersToAdd.clean(undefined);

        let markers = [];
        markersToAdd.forEach(function (facility) {
            let correct = 0;
            let mark = L.marker([facility.latitude, facility.longitude]);
            mark.bindPopup();

            mark.on("popupopen", function () {
                let popup = "<b>" + facility.name + "</b><br>Loading data...";
                mark.getPopup().setContent(popup);
                popup = "<b>" + facility.name + "</b>";
                if(facility.facilityType === "offstreet") {
                    if (facility.dynamicDataUrl !== undefined || facility.dynamicDataUrl !== null) {
                        $.getJSON(facility.dynamicDataUrl, function (data) {
                            if (data.parkingFacilityDynamicInformation !== undefined && data.parkingFacilityDynamicInformation.facilityActualStatus.parkingCapacity !== undefined) {
                                correct++;
                                popup += "<br> vacant spaces: " + data.parkingFacilityDynamicInformation.facilityActualStatus.vacantSpaces + "/" + data.parkingFacilityDynamicInformation.facilityActualStatus.parkingCapacity;
                            }
                        });
                    }

                    $.getJSON(facility.staticDataUrl, function (data) {
                        popup += "<br>Location: " + (facility.latitude!==undefined?facility.latitude: "<span class='text-danger'>No latitude</span>") + " " + (facility.longitude!==undefined?facility.longitude:"<span class='text-danger'>No longitude</span>") +
                            "<br>Tariffs: " + (data.tariffs!==undefined? "Available":"<span class='text-danger'>No Tariffs available</span>") +
                            "<br>Opening Hours: " + (data.openingTimes!==undefined? "Available":"<span class='text-danger'>No opening hours available</span>") +
                            "<br>Contact Person: " + (data.contactPersons!==undefined? "Available":"<span class='text-danger'>No contact persons available</span>") +
                            "<br>Constraints: " + (data.parkingRestrictions!==undefined?  "Available":"<span class='text-danger'>No parking restrictions available</span>");
                        mark.getPopup().setContent(popup);
                    });
                }else {
                    popup+="<br>This is an onstreet parking spot";
                    mark.getPopup().setContent(popup);

                }
            });
            if(facility.mark !== "onstreet"){
                if(facility.mark === "bad"){

                }else if(facility.mark === "average"){

                }else{

                }
            }else{
                mark.setIcon(offstreetIcon);
            }
            markers.push(mark);
        });

        cluster.addLayers(markers);
    }


    componentDidMount() {

        let map = this.renderMap();
        let main = this;
        let facilities = [];
        let cluster = L.markerClusterGroup({
            disableClusteringAtZoom: 17
        });
        map.addLayer(cluster);

        $("#layers div input").prop("checked", true);



        $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/" + map.getBounds().toBBoxString() + "/?format=json", function (json) {
            facilities = json;
            main.filterMarkers(facilities, cluster);

        });


        map.on("moveend", function () {
            $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/" + map.getBounds().toBBoxString() + "/?format=json", function (json) {

                facilities = json;
                main.filterMarkers(facilities, cluster);

            });
        });

        $("#layers div input").on("click", function () {
            main.filterMarkers(facilities, cluster);
        });

    }


    render() {

        return (

            <div id="mapParent">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
                      integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
                      crossorigin=""/>
                <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css"/>


                <div id="mapid"></div>
                <img src="./markers/parking-blue.png" alt=""/>

                <div id="layers">
                    <div>
                        <input type="checkbox" id="onstreet" name="filter" value="onstreet"/>
                        <label htmlFor="onstreet">On-street</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offstreet" name="filter" value="offstreet"/>
                        <label htmlFor="offstreet">Off-street</label>
                    </div>
                    <div>
                        <input type="checkbox" id="dynamic" name="filter" value="dynamic"/>
                        <label htmlFor="offstreet">Show parkings with no dynamic data</label>
                    </div>
                    <div>
                        <input type="checkbox" id="private" name="filter" value="private"/>
                        <label htmlFor="offstreet">private</label>
                    </div>
                    <div>
                        <input type="checkbox" id="public" name="filter" value="public"/>
                        <label htmlFor="offstreet">public</label>
                    </div>
                </div>
            </div>


        )


    }
}

export default MapContent;
