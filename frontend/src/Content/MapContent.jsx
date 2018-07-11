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

    loadData(coordinate){
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

            get latitude() {
                return this._latitude;
            }

            get longitude() {
                return this._longitude;
            }

            constructor(id, name, uuid, staticDataUrl, dynamicDataUrl, limitedAccess, latitude, longitude) {

                this._id = id;
                this._name = name;
                this._uuid = uuid;
                this._staticDataUrl = staticDataUrl;
                this._dynamicDataUrl = dynamicDataUrl;
                this._limitedAccess = limitedAccess;
                this._latitude = latitude;
                this._longitude = longitude;
            }
        }
        let facilities = [];
        let markers = [];
        let data = $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/"+coordinate+"/?format=json", function (json) {

            for (let coordinate of json) {
                facilities.push(new ParkingFacility(json.id, json.name, json.uuid, json.staticDataUrl, json.dynamicDataUrl, json.limitedAccess, json.latitude, json.longitude))
            }

            mar
        });
    }


    componentDidMount() {
        let map = this.renderMap();
        let main = this;

        let responses = [];
        let facilities = [];
        map.on("moveend", function () {
            responses = main.loadData(map.getBounds().toBBoxString());
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