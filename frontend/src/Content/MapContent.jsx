import React, { Component } from 'react';
import L from 'leaflet';

import './MapContent.css'
class MapContent extends Component{

    componentDidMount(){
        var test = L.map('mapid', {
            center: [52.1326, 5.2913],
            zoom: 8});
         L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(test);
    }

    renderMap(){
       
   }


    render(){
     
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