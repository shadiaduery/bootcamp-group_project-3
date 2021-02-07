
url = "http://127.0.0.1:5000/emission"

d3.json(url).then(function(data) {
    console.log(data);
    console.log(data[0].City);
   
   
   
      
      
    var darkmap =  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "dark-v10",
            accessToken: API_KEY
      })
      
      var geojson = {
        type: "FeatureCollection",
        features: [],
      };
      
      for (i = 0; i < data.length; i++) {
        
       

        var differenceEmission = (+data[i].emissions2017/+data[i].Population2017) - (+data[i].emissions2010/+data[i].Population2010)
        var percentDifferenceEmission = (differenceEmission/(+data[i].emissions2010/+data[i].Population2010)*100).toFixed(2)
        
        geojson.features.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [+data[i].Lng,+data[i].Lat]
          },
          "properties": {
            "City_State": data[i].City_State,
            "City": data[i].City,
            "State": data[i].State,
            "emissionsPerPopulation2017": +data[i].emissions2017/+data[i].Population2017,
            "percentDifferenceEmission": percentDifferenceEmission
          }
        });
      }
       console.log(geojson);
  
//Function for pop-up
function createPopups(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.City_State +
    //"</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
    //"</h3><hr><p><strong>Magnitude: " + feature.properties.mag + "</strong></p>" +
    "</h3><hr><p><strong>Difference in emissions per population between 2010 and 2017 (%):" + feature.properties.percentDifferenceEmission + "</strong></p>");
}
        //Function for marker and legend colors
       
  function getColor(d) {
    return d > 30 ? "#de2d26" : 
    d > 20 ? "#e34a33" : 
    d > 10 ? "#fdbb84" : 
    d > 0 ? "#fee8c8" : 
    d > -10 ? "#e5f5f9" : 
    d > -20 ? "#99d8c9" : 
    d < -20 ? "#2ca25f" : 
    "#FFF";
}
           

  //Function for creating circle markers
  function createCircles(feature, latlng) {
    
    

    //Markers
    var geojsonMarkerOptions = {
      radius: feature.properties.emissionsPerPopulation2017/500,
      fillColor: getColor(feature.properties.percentDifferenceEmission),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.6
    };
    return L.circleMarker(latlng, geojsonMarkerOptions);

  }

  //Layer for markers-circles and pop-ups
  var earthquakes = L.geoJSON(geojson.features, {
    onEachFeature: createPopups,
    pointToLayer: createCircles
  });
  
  //Adding layer to the map
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap, earthquakes]
  });

  //Creating a legend
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [-20, -10, 0, 10, 20, 30],
      labels = ['<strong>Difference in emissions per population between 2010 and 2017 (%)</strong>'];

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1] - 1;
      labels.push(
        '<i style="background:' + getColor(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
    }
    
    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(myMap);
       
});

