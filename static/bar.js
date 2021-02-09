function cityselection(City) {
    
    url = "http://127.0.0.1:5000/emission"
    
    d3.json(url).then((data)=> {
        console.log(data);
        
        var cities = data.map(c=>c.City === City)[0];
        console.log(cities);

        var citynames = d3.select("#sample-metadata");

        citynames.html("");

        Object.entries(cities).forEach((value) => {
            citynames.append("h5").text(value[0]);
        });

    });
}

cityselection();

function linegraph(City) {

    url = "http://127.0.0.1:5000/emission"
    
    d3.json(url).then((data)=> {
        console.log(data);

        var cities = data.map(c=>c.City);
        console.log(cities);

        console.log(City);

        data.forEach(d => console.log(d.City));

        var city = data.find(d => d.City == City);
        console.log(city);

        var emissions = []
        Object.entries(city).forEach(([key, value])=>{
            emissions.push(` ${value}`);
        });

        var labels = []
        Object.entries(city).forEach(([key, value])=>{
            labels.push(` ${key}`);

        });

        emissions = emissions.slice(13,21); 
        console.log(emissions);

        years = labels.slice(13,21); 
        
        console.log(years);
        
        // Use the created variables to create the visualizations
        // Go to the HTML to identify the name holding the visualizations ("bar", "bubble", "gauge", and a "pie")
        var trace = {
            x: years,
            y: emissions,
            text: years,
            type: "line",
            orientation: "h",
        };   

        var data = [trace];
        
        var layout = {
            title: "Emission CO2 Metric Tones",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        Plotly.newPlot("visualization1", data, layout);

    });

}

linegraph();

function optionChanged(City){
    linegraph(City);
    cityselection(City);
}

function dropdown () {
    var drop_down = d3.select("#selDataset");

    url = "http://127.0.0.1:5000/emission"
    
    d3.json(url).then((data)=> {
        console.log(data);

        var cities = data.map(c=>c.City);

        var SelectID = cities;
        console.log(SelectID);

        // Use the forEach method to append all the ids to the dropdown menu
        SelectID.forEach(function(City) {
            drop_down.append('option').text(City).property("value");
        });

        cityselection(cities[0]);
        linegraph(cities[0]);
        

    });
}

dropdown();