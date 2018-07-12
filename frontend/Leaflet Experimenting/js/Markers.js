//Little class helped me structure the parkingfacilities a bit
class ParkingData {
    constructor(data) {
        this.ParkingFacilities = data.ParkingFacilities;
    }

    get facilities() {
        return this.ParkingFacilities;
    }
}

//JSON.parse('{"ParkingFacilities":[{"name":"Buiten Wittevrouwen","uuid":"d8f4e169-b645-40e8-bb53-394d50d46a69","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/d8f4e169-b645-40e8-bb53-394d50d46a69","limitedAccess":false},{"name":"Hooch Boulandt","uuid":"8c7ba5df-6789-4d9d-917f-05edd1094af0","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/8c7ba5df-6789-4d9d-917f-05edd1094af0","limitedAccess":false},{"name":"Hagelbuurt","uuid":"e39fb478-454d-4716-826a-f70ee51e98a0","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/e39fb478-454d-4716-826a-f70ee51e98a0","limitedAccess":false},{"name":"Nieuw Engeland","uuid":"6c3fefe8-2522-4e0a-a586-b2fb34dc2b5a","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/6c3fefe8-2522-4e0a-a586-b2fb34dc2b5a","limitedAccess":false},{"name":"Lombok","uuid":"4ca3113b-a777-4a60-8783-e20b1c013530","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/4ca3113b-a777-4a60-8783-e20b1c013530","limitedAccess":false},{"name":"Leidseweg e.o.","uuid":"723f04a6-e302-47cc-b07b-f2ced317ed38","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/723f04a6-e302-47cc-b07b-f2ced317ed38","limitedAccess":false},{"name":"Oudwijk Noord","uuid":"51c6c082-b5d0-48f8-be5a-6983918a036a","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/51c6c082-b5d0-48f8-be5a-6983918a036a","limitedAccess":false},{"name":"Schildersbuurt","uuid":"a2d10d0c-3fc0-4490-8820-d3b348cd68d4","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/a2d10d0c-3fc0-4490-8820-d3b348cd68d4","limitedAccess":false},{"name":"Abstede","uuid":"a87ef61f-35b0-449c-9a0f-8019c15c0651","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/a87ef61f-35b0-449c-9a0f-8019c15c0651","limitedAccess":false},{"name":"Rivierenwijk","uuid":"730f1e05-6b05-4fd2-a6c5-d0c497771ea6","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/730f1e05-6b05-4fd2-a6c5-d0c497771ea6","limitedAccess":false},{"name":"GRV011KLK Garage De Kolk","limitedAccess":false,"dynamicDataUrl":"http://opd.it-t.nl/data/parkingdata/v1/amsterdam/dynamic/900000007_parkinglocation.json","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/5aeda459-707f-4a71-a2ed-d87fcb37a431","uuid":"5aeda459-707f-4a71-a2ed-d87fcb37a431"},{"name":"GRV014ODE Garage Oosterdokseiland","limitedAccess":false,"dynamicDataUrl":"http://opd.it-t.nl/data/parkingdata/v1/amsterdam/dynamic/900000087_parkinglocation.json","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/17ec5a7f-2d59-40e7-a32a-3060ee718a3b","uuid":"17ec5a7f-2d59-40e7-a32a-3060ee718a3b"},{"name":"GRV016YDK Garage IJdok","limitedAccess":false,"dynamicDataUrl":"http://opd.it-t.nl/data/parkingdata/v1/amsterdam/dynamic/900000118_parkinglocation.json","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/2c0c337e-7c19-4db5-9da8-6bcc8e635404","uuid":"2c0c337e-7c19-4db5-9da8-6bcc8e635404"},{"name":"P-Hoeksterend","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/a03c3613-6fed-4659-906f-17843c227622","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/a03c3613-6fed-4659-906f-17843c227622","uuid":"a03c3613-6fed-4659-906f-17843c227622"},{"name":"P-Klanderij","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/14f1046d-1fda-4081-883b-d6a8a2ad937d","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/14f1046d-1fda-4081-883b-d6a8a2ad937d","uuid":"14f1046d-1fda-4081-883b-d6a8a2ad937d"},{"name":"P-Oldehove","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/c0bc471b-86b3-4d80-b62f-1d88101096b2","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/c0bc471b-86b3-4d80-b62f-1d88101096b2","uuid":"c0bc471b-86b3-4d80-b62f-1d88101096b2"},{"name":"P-Oosterstraat","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/3a2cade6-19ab-4a95-8409-459cf8b46cdf","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/d3bd2edf-cd1f-4b3d-baee-eb37c8bc9e53","uuid":"d3bd2edf-cd1f-4b3d-baee-eb37c8bc9e53"},{"name":"P-Zaailand","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/80d26cc5-1210-4bdf-beb4-0602f35bdccc","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/80d26cc5-1210-4bdf-beb4-0602f35bdccc","uuid":"80d26cc5-1210-4bdf-beb4-0602f35bdccc"},{"name":"Stationsplein","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/45434989-3252-4c85-8731-c856b02c390c","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/45434989-3252-4c85-8731-c856b02c390c","uuid":"45434989-3252-4c85-8731-c856b02c390c"},{"name":"Parkeergarage Stadspoort - Dek","limitedAccess":false,"dynamicDataUrl":"http://opendata.technolution.nl/opendata/parkingdata/v1/dynamic/5829fb06-ee4a-4762-946c-ed6209edf7d5","staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/e3b7e292-ef14-43c9-96fb-85ab7b08ef09","uuid":"e3b7e292-ef14-43c9-96fb-85ab7b08ef09"},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/25fc5d11-985d-418b-9793-00272bf0b189","geoLocation":{"longitude":4.855496,"coordinatesType":"WGS84","latitude":51.64499},"name":"Arendshof","uuid":"25fc5d11-985d-418b-9793-00272bf0b189","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/25fc5d11-985d-418b-9793-00272bf0b189","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/b2df810f-502d-43f0-8f86-1faad52434d0","geoLocation":{"longitude":5.788207,"coordinatesType":"WGS84","latitude":53.19498},"name":"P+R Wijnhornsterstraat","uuid":"b2df810f-502d-43f0-8f86-1faad52434d0","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/b2df810f-502d-43f0-8f86-1faad52434d0","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/5ee1b47c-51af-4378-8179-34a33039d483","geoLocation":{"longitude":4.872093,"coordinatesType":"WGS84","latitude":52.337307},"name":"Mahler","uuid":"5ee1b47c-51af-4378-8179-34a33039d483","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/5ee1b47c-51af-4378-8179-34a33039d483","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/34cb6f4e-c214-4eef-ab63-5f6a8a4bf3fb","geoLocation":{"longitude":4.32164,"coordinatesType":"WGS84","latitude":52.0799332},"name":"Helicon","uuid":"34cb6f4e-c214-4eef-ab63-5f6a8a4bf3fb","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/34cb6f4e-c214-4eef-ab63-5f6a8a4bf3fb","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/4756e8cd-cc3a-48c2-a2b2-56528d91d0da","geoLocation":{"longitude":5.911528,"coordinatesType":"WGS84","latitude":51.9796753},"name":"Broerenstraat","uuid":"4756e8cd-cc3a-48c2-a2b2-56528d91d0da","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/4756e8cd-cc3a-48c2-a2b2-56528d91d0da","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/27ec369b-68d1-4b74-b62c-78969d6ff706","geoLocation":{"longitude":4.857867,"coordinatesType":"WGS84","latitude":52.3030472},"name":"Stadsplein","uuid":"27ec369b-68d1-4b74-b62c-78969d6ff706","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/27ec369b-68d1-4b74-b62c-78969d6ff706","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/2e9e0e3d-295b-46db-89c2-479b5385a380","geoLocation":{"longitude":5.155978,"coordinatesType":"WGS84","latitude":52.28047},"name":"P+R Slochterenlaan","uuid":"2e9e0e3d-295b-46db-89c2-479b5385a380","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/2e9e0e3d-295b-46db-89c2-479b5385a380","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/a78cd3d6-ec05-45b3-ae49-33cf49f12bfb","geoLocation":{"longitude":4.655274,"coordinatesType":"WGS84","latitude":52.3241234},"name":"Spaarne Gasthuis","uuid":"a78cd3d6-ec05-45b3-ae49-33cf49f12bfb","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/a78cd3d6-ec05-45b3-ae49-33cf49f12bfb","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/b4d94be3-0ae6-45ff-969f-4616e0b015c4","geoLocation":{"longitude":4.711289,"coordinatesType":"WGS84","latitude":52.01438},"name":"Nieuwe Markt","uuid":"b4d94be3-0ae6-45ff-969f-4616e0b015c4","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/b4d94be3-0ae6-45ff-969f-4616e0b015c4","limitedAccess":true},{"staticDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/static/cca8eb08-9e4c-4657-8724-3bc2c2654dfd","geoLocation":{"longitude":6.164703,"coordinatesType":"WGS84","latitude":52.25325},"name":"De Boreel","uuid":"cca8eb08-9e4c-4657-8724-3bc2c2654dfd","dynamicDataUrl":"https://npropendata.rdw.nl/parkingdata/v2/dynamic/cca8eb08-9e4c-4657-8724-3bc2c2654dfd","limitedAccess":true}]}');
$.getJSON("../res/data_index_1_3_sample.json", function (data) {
    loadMarkers(data)
});

let coords = [];
let markersLayer = L.layerGroup().addTo(map);
let zonesLayer = L.layerGroup().addTo(map);

function loadMarkers(data) {
    let parkingData = new ParkingData(data);

    for (let fac of parkingData.facilities) {
        $.get(
            fac.staticDataUrl,
            function (data) {
                let marker;
                if (data.parkingFacilityInformation.specifications[0].usage.toUpperCase() === "PARKEERGARAGE" || data.parkingFacilityInformation.specifications[0].usage.toUpperCase() === "PARKEER GARAGE") {
                    //get coordinates
                    let x = data.parkingFacilityInformation.locationForDisplay.latitude.toString();
                    let y = data.parkingFacilityInformation.locationForDisplay.longitude.toString();
                    x = x.slice(0, x.length - 6) + '.' + x.slice(x.length - 6);
                    y = y.slice(0, y.length - 6) + '.' + y.slice(y.length - 6);
                    //making marker
                    let marker = L.marker([x, y]).addTo(map);
                    //make popup
                    marker.bindPopup("<b>" + fac.name + "</b>");
                    //add to marker layer
                    markersLayer.addLayer(marker);
                } else if (data.parkingFacilityInformation.specifications[0].usage.toUpperCase() === "VERGUNNING PARKEREN") {
                    let poli = [];
                    //get coordinates
                    data.parkingFacilityInformation.specifications[0].areaGeometry.coordinates[0].map(function (x) {
                        poli.push([x[1], x[0]]);
                    });
                    let polygon = L.polygon(poli).addTo(map);
                    polygon.bindPopup("<b>" + fac.name + "</b>");
                    zonesLayer.addLayer(polygon);
                } else if (data.parkingFacilityInformation.specifications[0].usage.toUpperCase() === "PARK & RIDE" || data.parkingFacilityInformation.specifications[0].usage.toUpperCase() === "GARAGEPARKEREN" || data.parkingFacilityInformation.specifications[0].usage.toUpperCase() === "GARAGE PARKEREN") {
                    //get coordinates
                    let x = data.parkingFacilityInformation.accessPoints[0].accessPointLocation[0].latitude;
                    let y = data.parkingFacilityInformation.accessPoints[0].accessPointLocation[0].longitude;
                    //making marker
                    let marker = L.marker([x, y]).addTo(map);
                    //If a dynamic link exists, add available parking spots and capacity
                    let popup = "<b>" + fac.name + "</b>";
                    if (!fac.limitedAccess) {
                        $.get(
                            fac.dynamicDataUrl,
                            function (dynamicData) {
                                popup += "<br>spaces: " + dynamicData.parkingFacilityDynamicInformation.facilityActualStatus.vacantSpaces + "\\" + dynamicData.parkingFacilityDynamicInformation.facilityActualStatus.parkingCapacity
                                marker.bindPopup(popup);
                            }
                        );
                    } else {
                        marker.bindPopup(popup);
                    }
                    //add to marker layer
                    markersLayer.addLayer(marker);
                }
            }
        );
    }
}

//filter events for showing/removing layers
function checkMarkers() {
    if (!$("#markers").prop("checked")) {
        markersLayer.invoke("remove")
    } else {
        markersLayer.eachLayer(function (layer) {
            layer.addTo(map);
        })
    }
}
checkMarkers();

function checkLayers() {
    if (!$("#zones").prop("checked")) {
        zonesLayer.invoke("remove")
    } else {
        zonesLayer.eachLayer(function (layer) {
            layer.addTo(map);
        })
    }
}
checkLayers();

$("#markers").on("click", checkMarkers);
$("#zones").on("click", checkLayers);


