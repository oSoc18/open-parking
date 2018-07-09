import React, { Component } from 'react';
import L from 'leaflet';

class Test extends Component{

   

    componentDidMount(){
        var test = L.map('mapid', {
            center: [52.1326, 5.2913],
            zoom: 8});
         L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(test);
    }

    renderMap(){
       
   }


    render(){

        
         
        return <div>
            <div id="mapid"></div>
        </div>
    }
}

export default Test;