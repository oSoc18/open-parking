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
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXNsYWQiLCJhIjoiY2pqbzZiczU0MTV5aTNxcnM5bWY1Nnp4YSJ9.C9UeB-y3MTGiU8Lv7_m5dQ').addTo(map);
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

        let test = [];
        markersToAdd.forEach(function (eacj) {
           test.push(eacj.facilityType);
        });
        console.log(test);



        let markers = [];
        markersToAdd.forEach(function (facility) {
            let mark = L.marker([facility.latitude, facility.longitude]);
            mark.bindPopup("<b>" + facility.name + "</b><br>" + facility.id + " " + facility.latitude + " " + facility.longitude);
            mark.on("popupopen", function () {
                $.get(facility.staticDataUrl, function (data) {
                    console.log(data);
                });
                if (facility.dynamicDataUrl !== null) {
                    $.get(facility.dynamicDataUrl, function (data) {
                        console.log(data);
                        //TODO: Get dynamic data
                        //mark.getPopup().setContent("<b>"+facility.name+"</b><br/>vacant spaces: " + data.parkingFacilityDynamicInformation.facilityActualStatus.vacantSpaces + " " + data.parkingFacilityDynamicInformation.facilityActualStatus.capacity);
                        console.log(data);
                    });
                }
            });
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

        $("#onstreet").prop("checked", true);
        $("#offstreet").prop("checked", true);


        $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/" + map.getBounds().toBBoxString() + "/?format=json", function (json) {
            console.log(json.length);
            facilities = json;
            main.filterMarkers(facilities, cluster);

        });


        map.on("moveend", function () {
            $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/" + map.getBounds().toBBoxString() + "/?format=json", function (json) {

                facilities = json;
                main.filterMarkers(facilities, cluster);

            });
        });

        $("#onstreet").on("click", function () {
            main.filterMarkers(facilities, cluster);
        });
        $("#offstreet").on("click", function () {
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
                <link rel="stylesheet"
                      href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css"/>


                <div id="mapid"></div>

                <div id="layers">
                    <div>
                        <input type="checkbox" id="onstreet" name="filter" value="onstreet"/>
                        <label htmlFor="onstreet">On-street</label>
                    </div>
                    <div>
                        <input type="checkbox" id="offstreet" name="filter" value="offstreet"/>
                        <label htmlFor="offstreet">Off-street</label>
                    </div>
                </div>
            </div>


        )


    }
}

export default MapContent;