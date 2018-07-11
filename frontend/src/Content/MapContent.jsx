import React, {Component} from 'react';
import $ from 'jquery';
import L from 'leaflet';

import './MapContent.css'
class MapContent extends Component {

    renderMap() {
        var map = L.map('mapid', {
            center: [52.1326, 5.2913],
            zoom: 8
        });
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        return map;
    }

    // async loadData(){
    //     let facilities = [];
    //     for (let i = 0; i < 200; i++) {
    //         facilities = await $.get("http://127.0.0.1:8000/parkingdata/"+i+"/");
    //     }
    //     return facilities;
    // }

    componentDidMount() {
        let map = this.renderMap();
        class ParkingFacility {
            get id() {
                return this._id;
            }

            get name() {
                return this._name;
            }

            get uuid() {
                return this._uuid;
            }

            get staticDataUrl() {
                return this._staticDataUrl;
            }

            get dynamicDataUrl() {
                return this._dynamicDataUrl;
            }

            get limitedAccess() {
                return this._limitedAccess;
            }

            get geolocation() {
                return this._geolocation;
            }

            constructor(id, name, uuid, staticDataUrl, dynamicDataUrl, limitedAccess, geolocation) {

                this._id = id;
                this._name = name;
                this._uuid = uuid;
                this._staticDataUrl = staticDataUrl;
                this._dynamicDataUrl = dynamicDataUrl;
                this._limitedAccess = limitedAccess;
                this._geolocation = geolocation;
            }
        }
        let facilities = [];
        map.on("moveend", function () {
            console.log(map.getBounds().toBBoxString());
        });






    }


    render() {

        return (

            <div id="mapParent">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
                      integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
                      crossorigin=""/>


                <div id="mapid"></div>


            </div>)

    }
}

export default MapContent;