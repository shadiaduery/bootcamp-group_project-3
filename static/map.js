
url = "http://127.0.0.1:5000/emission"

d3.json(url).then(function (data) {
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    zoomSnap: 0.25,
    id: "dark-v10",
    accessToken: API_KEY
  })

  var geojson = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < data.length; i++) {

    var differenceEmission = (+data[i].emissions2017 / +data[i].Population2017) - (+data[i].emissions2010 / +data[i].Population2010)
    var percentDifferenceEmission = (differenceEmission / (+data[i].emissions2010 / +data[i].Population2010) * 100).toFixed(2)

    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [+data[i].Lng, +data[i].Lat]
      },
      "properties": {
        "City_State": data[i].City_State,
        "City": data[i].City,
        "State": data[i].State,
        "Population2010": +data[i].Population2010,
        "Population2017": +data[i].Population2017,
        "emissionsPerPopulation2010": (+data[i].emissions2010 / +data[i].Population2010).toFixed(2),
        "emissionsPerPopulation2017": (+data[i].emissions2017 / +data[i].Population2017).toFixed(2),
        "percentDifferenceEmission": percentDifferenceEmission
      }
    });
  }
  console.log(geojson);

  //Function for pop-up
  function createPopups(feature, layer) {
    layer.bindPopup("<h5><strong>" + feature.properties.City_State + "</strong></h5>" +
      "<p><strong>CO2 transportation emissions per capita:</strong>" +
      "<p>2010: <strong>" + feature.properties.emissionsPerPopulation2010 + " kg</strong></p>" +
      "<p>2017: <strong>" + feature.properties.emissionsPerPopulation2017 + " kg</strong></p>" +
      "<p>Changes 2017 to 2010:  <h5><strong>" + feature.properties.percentDifferenceEmission + "%</strong></h5></p>");
  }
  //Function for marker and legend colors

  function getColor(d) {
    return d > 35 ? "#b10026" :
      d > 30 ? "#e31a1c" :
        d > 25 ? "#fc4e2a" :
          d > 20 ? "#fd8d3c" :
            d > 15 ? " #feb24c" :
              d > 10 ? "#fed976" :
                d > 5 ? " #ffeda0" :
                  d > 1 ? "#ffffcc" :
                  d > -1 ? "#fff" :
                    d > -5 ? " #a1d99b" :
                      d > -10 ? " #74c476" :
                        d > -15 ? "#41ab5d" :
                          d > -20 ? " #238b45" :
                            d > -25 ? "#005a32" :
                              "#FFF";
  }
  
  //Function for creating circle markers
  function createCircles(feature, latlng) {


    //Markers
    var geojsonMarkerOptions = {
      radius: feature.properties.emissionsPerPopulation2017/480,
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
      32.8140, -96.9489
    ],
    zoom: 10,
    layers: [darkmap, cities]
  });
  
  //Creating a legend
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [-25, -20, -15, -10, -5, -1, 1, 5, 10, 15, 20, 25, 30, 35],
      labels = ['<strong>Changes in emissions per capita 2017 to 2010 (%)</strong>'];

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];
      labels.push(
        '<i style="background:' + getColor(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(myMap);

});

