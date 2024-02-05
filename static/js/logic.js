var map = L.map('map').setView([51.505, -0.09],2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

d3.json(url).then(data=>{
    console.log(data)

    L.geoJSON(data, {
        style: function (feature) {
            let mag = feature.properties.mag;
            let depth = feature.geometry.coordinates[2];

            return {
                radius:mag*4,
                color:"white",
                weight:1,
                fillOpacity:.5,
                fillColor:
                    depth>90?"red":
                    depth>70?"darkorange":
                    depth>50?"orange":
                    depth>30?"yellow":
                    depth>10?"yellowgreen":"green"
            };
        }, 

        pointToLayer: function(geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
        }
   })
    .bindPopup(function (layer) {
        let mag = layer.feature.properties.mag;
        let place = layer.feature.properties.place;
        let date = new Date(layer.feature.properties.time).toLocaleString();

        return `<h3>${place}<br>${date}<br>Magnitude: ${mag}</h3>`;
     }).addTo(map);

});


var legend = L.control({position:"bottomright"});
legend.onAdd = () => {
    var div = L.DomUtil.create("div", "legend");
    depth = [-10, 10, 30, 50, 70, 90];
    div.innerHTML =
      `<h4></h4>
      <i style="padding:80px;background:white;color:white";position:""></i><br>
      <i style="padding:5px;background:green;color:green">___</i>
       <i style="padding:5px;background:transparent;color:black">-10 - 10</i><br>
       <i style="padding:5px;background:yellowgreen;color:yellowgreen">___</i>
       <i style="padding:5px;background:transparent;color:black">10 - 30</i><br>
       <i style="padding:5px;background:yellow;color:yellow">___</i>
       <i style="padding:5px;background:transparent;color:black">30 - 50</i><br>
       <i style="padding:5px;background:orange;color:orange">___</i>
       <i style="padding:5px;background:transparent;color:black">30 - 50</i><br>
       <i style="padding:5px;background:darkorange;color:darkorange">___</i>
       <i style="padding:5px;background:transparent;color:black">50 - 70</i><br>
       <i style="padding:5px;background:red;color:red">___</i>
       <i style="padding:5px;background:transparent;color:black">90+</i><br>
      `
    return div;
  };

  legend.addTo(map);


 