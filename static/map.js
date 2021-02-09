
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
            "Population2010": +data[i].Population2010,
            "Population2017": +data[i].Population2017,
            "emissionsPerPopulation2010": (+data[i].emissions2010/+data[i].Population2010).toFixed(2),
            "emissionsPerPopulation2017": (+data[i].emissions2017/+data[i].Population2017).toFixed(2),
            "percentDifferenceEmission": percentDifferenceEmission
          }
        });
      }
       console.log(geojson);
  
//Function for pop-up
function createPopups(feature, layer) {
  layer.bindPopup("<h5><strong>" + feature.properties.City_State + "</strong></h5>" + 
    "<p>CO2 emissions per population, 2010: <strong>" + feature.properties.emissionsPerPopulation2010 + " kg</strong></p>" +
    "<p>CO2 emissions per population, 2017: <strong>" + feature.properties.emissionsPerPopulation2017 + " kg</strong></p>" +
    "<p>Difference 2010/2017:  <h5><strong>" + feature.properties.percentDifferenceEmission + "%</strong></h5></p>");
}
        //Function for marker and legend colors
       
  function getColor(d) {
    return d > 30 ? "#a63603" : 
    d > 20 ? "#e6550d" : 
    d > 10 ? "#fd8d3c" : 
    d > 0 ? "#fdbe85" : 
    d > -10 ? "#66c2a4" : 
    d > -20 ? "#2ca25f" : 
    d < -20 ? "#006d2c" : 
    
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
  var cities = L.geoJSON(geojson.features, {
    onEachFeature: createPopups,
    pointToLayer: createCircles
  });
  
  //Adding layer to the map
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap, cities]
  });

  //Creating a legend
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [-20, -10, 0, 10, 20, 30],
      labels = ['<strong>Difference in emissions per population between 2010 and 2017 (%)</strong>'];

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];
      labels.push(
        '<i style="background:' + getColor(from+1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
    }
    
    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(myMap);
       
});

