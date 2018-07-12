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
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        return map;
    }


    componentDidMount() {

        let map = this.renderMap();
        let markers = [];
        let cluster = L.markerClusterGroup();

        $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/"+ map.getBounds().toBBoxString() +"/?format=json", function (json) {
            for (let mark of markers) {
                mark.remove();
                markers = [];
                cluster.clearLayers();
            }

            json.map(function (facility) {
                let mark = L.marker([facility.latitude, facility.longitude]);
                mark.bindPopup("<b>"+facility.name+"</b>");
                markers.push(mark);

            });
            cluster.addLayers(markers);
            map.addLayer(cluster);

        });

        map.on("moveend", function () {
            $.getJSON("http://127.0.0.1:8000/parkingdata/rectangle/"+ map.getBounds().toBBoxString() +"/?format=json", function (json) {
                for (let mark of markers) {
                    mark.remove();
                    markers = [];
                    cluster.clearLayers();
                }

                json.map(function (facility) {
                    let mark = L.marker([facility.latitude, facility.longitude])
                    mark.bindPopup("<b>"+facility.name+"</b>")
                    markers.push(mark);

                });
                cluster.addLayers(markers);
                map.addLayer(cluster);

            });
        });

    }


    render() {

        return (

            <div id="mapParent">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
                      integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
                      crossorigin=""/>
                <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css"/>
                <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css"/>


                <div id="mapid"></div>


            </div>)

    }
}

export default MapContent;