// function bargraph(id) {

    url = "http://127.0.0.1:5000/emission"
    
    d3.json(url).then(function(alldata) {
        console.log(alldata);
        
        // Create variables to hold all the data needed to create the visualizations
        var data = alldata;

        var cities = data.map(d=> d.City);
        console.log(cities);

        var states = data.map(s=> s.State);
        console.log(states);

        var emissions = data.map(e=> e.data[13-20]);
        console.log(emissions);

        var years = Object.entries(data).forEach((key[13-20]));
        console.log(years);
        
    });

        // emissions=[]

        // var emissions = Object.entries(data.forEach(([key,value]) => {
        //     (`${key} ${value}`);

        //     console.log(emissions);
        // }));

        
            // htmlDemographicInfo.append(emissions).text(key[0].toUpperCase() + ": " + key[1] + "\n");

    

        // var samples = data.samples.filter(sample => sample.id.toString()===id)[0];
        // console.log(samples);

        // var sampleValues = samples.sample_values.slice(0, 10).reverse();
        // console.log(sampleValues);

        // var OtuIds = samples.otu_ids.slice(0, 10).reverse();
        // console.log (OtuIds)
        // var OtuIds1 = OtuIds.map(data => "OTU"+ data)
        // console.log(OtuIds1);

        // var OtuLabels = samples.otu_labels.slice(0, 10).reverse();
        // console.log (OtuLabels);

    //     // Use the created variables to create the visualizations
    //     // Go to the HTML to identify the name holding the visualizations ("bar", "bubble", "gauge", and a "pie")
    //     var trace1 = {
    //         x: sampleValues,
    //         y: OtuIds1,
    //         text: OtuLabels,
    //         type: "bar",
    //         orientation: "h",
    //     };   

    //     var data1 = [trace1];
        
    //     var layout1 = {
    //         title: "Top 10 OTU",
    //         yaxis: {
    //             tickmode: "linear",
    //         },
    //         margin: {
    //             l: 70,
    //             r: 50,
    //             t: 50,
    //             b: 50
    //         }
    //     };

    //     Plotly.newPlot("bar", data1, layout1);

    // })};