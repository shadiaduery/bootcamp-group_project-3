
var svgWidth = 960
var svgHeight = 660;

var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// console.log(width)
// console.log(height)

var svg = d3.select("#visualization2")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// either works!
// url = "http://127.0.0.1:5000/pizzas"
// url = "http://127.0.0.1:5000/emission"

url = "http://127.0.0.1:5000/scatter"


function getScatterPlot(year) {

    d3.json(url).then(function (emission) {
        console.log(year)
        // console.log("selecting data")
        var emission_population = []
        emission_population = emission[year].Values
        console.log(emission_population)

        var emi = []
        var pop = []
        var city=[]
        emission_population.forEach(function (data) {
            emi.push(data.Emission)
            pop.push(data.Population)
            city.push(data.City)
        });
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
function optionChanged(year) {
    getScatterPlot(year)
    // console.log("called")

}

function init() {
    var dropdownMenu = d3.selectAll("#selDataset");
    d3.json(url).then(function (emission) {
        console.log(emission)
        console.log("xxxx")
        console.log(emission[2011].Year)
        console.log("xxxxxxxxx")
        //var year_data = [emission[2010].Year, emission[2011].Year,emission[2012].Year,
        //                emission[2013].Year,emission[2014].Year,emission[2015].Year,
        //                emission[2016].Year,emission[2017].Year]
        
        console.log("YYYYYYYYY")
        console.log(year_data)

        console.log("qwertyu")
        var year_data = [];
        for (let i = 2010; i < 2018 ; i++) {
            year_data.push(emission[i].Year)
            console.log(emission[i].Year)
        }
        console.log(year_data)
        console.log("qwertyu")
        year_data.forEach(function (year) {
            dropdownMenu.append("option").text(year).property("value");
            //console.log(year_data[0])
        })
        getScatterPlot(year_data[0]);
    })
}
init();

