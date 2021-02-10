
// either works!
// url = "http://127.0.0.1:5000/pizzas"
// url = "http://127.0.0.1:5000/emission"

queryUrl = "http://127.0.0.1:5000/scatter"


function getScatterPlot(year) {

    d3.json(queryUrl).then(function (emission) {
        // console.log(year)
        // console.log("selecting data")
        var emission_population = []
        emission_population = emission[year].Values
        console.log(emission)

        var emi = []
        var pop = []
        var city=[]
        emission_population.forEach(function (data) {
            emi.push(data.Emission)
            pop.push(data.Population)
            city.push(data.City)
        });
        console.log(emi);
        console.log(pop);
        console.log(city);
        var trace1 = {
            x: pop,
            y: emi,
            text:city,
            mode: 'markers',
            type: 'scatter'
        };

        var layout = {
            title: "Population vs Emission over all Cities",
            margin: {
                l: 50,
                r: 100,
                t: 100,
                b: 100
            },
            xaxis:{title:"Population"},
            yaxis:{title:"Emission"}
            };
    
        var data = [trace1];
        Plotly.newPlot("scatter", data,layout)

    });
}
function scatterChange(year) {
    getScatterPlot(year)
    // console.log("called")

}

function init() {
    var dropdownMenu = d3.selectAll("#Dataset");
    d3.json(queryUrl).then(function (emission) {
        // console.log(emission)
        // console.log("xxxx")
        // console.log(emission[2011].Year)
        // console.log("xxxxxxxxx")
        //var year_data = [emission[2010].Year, emission[2011].Year,emission[2012].Year,
        //                emission[2013].Year,emission[2014].Year,emission[2015].Year,
        //                emission[2016].Year,emission[2017].Year]
        
        // console.log("YYYYYYYYY")
        // console.log(year_data)

        // console.log("qwertyu")
        var year_data = [];
        for (let i = 2010; i < 2018 ; i++) {
            year_data.push(emission[i].Year)
            // console.log(emission[i].Year)
        }
        // console.log(year_data)
        // console.log("qwertyu")
        year_data.forEach(function (year) {
            dropdownMenu.append("option").text(year).property("value");
            //console.log(year_data[0])
        })
        getScatterPlot(year_data[0]);
    })
}
init();

