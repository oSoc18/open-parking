let map = L.map('mapid', {
    center: [52.1326, 5.2913],
    zoom: 8});
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);