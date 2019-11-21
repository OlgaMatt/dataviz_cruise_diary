// Global var for cruise ship cup data
var allData;
var projection;
var counter = 0;



function updateData() {
    if (counter < 300) { //number to stop simulation max(106343) or allData.length
        var refresh = 100; // Refresh rate in milli seconds
        mytime = setTimeout('displayData()', refresh)
        counter = counter + 1;
    } else {
        console.log('end of Simulation.. stop streming data..');
    }
}

function drawArrowWind() { //draw arrow
    var windDir = d3.select("#windDir")

    var dataArrow = [
        [10, 40],
        [25, 10],
        [40, 40],
        [10, 40]
    ]; //  <path d ="M10,40 L25,10 L40,40 L10,40" />
    var lineGenerator = d3.line();
    var pathString = lineGenerator(dataArrow);

    windDir.append("path")
        .attr('d', pathString);

}

function drawArrowCompass() { //draw arrow

    var dataArrow = [
        [35, 50],
        [50, 0],
        [65, 50],
        [50, 100],
        [35, 50]
    ]; //  <path d ="M10,40 L25,10 L40,40 L10,40" />      [15, 25], [25, 0], [35, 25], [25, 50], [15, 25]
    var lineGenerator = d3.line();
    var pathString = lineGenerator(dataArrow);

    /*    var compass= d3.select("#compass");

       //Draw the Circle
        var circle = compass.append("circle")
            .attr("cx", 25)
            .attr("cy", 25)
            .attr("r", 25)
            .style("stroke", "black")
            .style("stroke-width", "2px")
            .style("fill", "white");

         var circle2 = compass.append("circle")
            .attr("cx", 25)
            .attr("cy", 25)
            .attr("r", 20)
            .style("stroke", "black")
            .style("stroke-width", "2px")
            .style("fill", "white");
    */

    var compassArrow = d3.select("#noun_compass");

    //draw arrow(s)
    compassArrow.append("path")
        .attr('d', pathString);

}


function prepareHtml() { //####maybe we need to do the structure here with d3??

    //navigation
    d3.select('#distanceTravelled')
        .append("p");
    d3.select('#shipSpeed')
        .append("p");
    d3.select('#elevation')
        .append("p");
    d3.select('#timeRemaining')
        .append("p");

    //lon lat
    d3.select('#long')
        .append("p");
    d3.select('#lat')
        .append("p");

    //weatherData
    d3.select('#temp')
        .append("p");
    d3.select('#hum')
        .append("p");
    d3.select('#sol')
        .append("p");
    d3.select('#uv')
        .append("p");
}



function displayData() { //####(shows data, maybe changing styls?...)
    var restDistance;
    var timeInH, days, hours, minutes; //variables for traveltime

    restDistance = 666 - allData[counter].distance; // also possible to get the max() instead of 666 but we made the assumption that the start and the destination should be given and not being part of the live data
    timeInH = (restDistance / (allData[counter].shipSpeed * 1.852)) //multiply with 1.852 to get kmh
    days = Math.round(Math.floor(timeInH / 24));
    hours = Math.round((timeInH = timeInH % 24));
    minutes = Math.floor(timeInH % 60);

    //shipDirection
    var arrowCompass = d3.select("#noun_compass")
        .attr("transform", "rotate(" + allData[counter].shipDirection + ")"); //


    //windDirection
    var arrowWind = d3.select("#windDir")
        .attr("transform", "rotate(" + allData[counter].appWindDir + ")");

    //Coordination data

    d3.select('#distanceTravelled')
        .select('p')
        .text(allData[counter].distance + "km")
        .style("color", "#80D4FF");
    d3.select('#shipSpeed')
        .select('p')
        .text(allData[counter].shipSpeed + "knots")
        .style("color", "#80D4FF");
    d3.select('#elevation')
        .select('p')
        .text(allData[counter].elevation + "m")
        .style("color", "#80D4FF");
    d3.select('#timeRemaining')
        .select('p')
        .text(days + ':' + hours + ':' + minutes)
        .style("color", "#80D4FF");


    //lon lat

    d3.select('#long')
        .select('p')
        .text(allData[counter].lon)
        .style("color", "#80D4FF");
    d3.select('#lat')
        .select('p')
        .text(allData[counter].lat)
        .style("color", "#80D4FF");

    //weatherData
    d3.select('#temp')
        .select('p')
        .text(allData[counter].temperature + ' °C        ')
        .style("color", "#80D4FF");
    d3.select('#hum')
        .select('p')
        .text(allData[counter].humidity + ' %       ')
        .style("color", "#80D4FF");
    d3.select('#sol')
        .select('p')
        .text(allData[counter].solarRadiation + ' w/m²       ')
        .style("color", "#80D4FF");
    d3.select('#uv')
        .select('p')
        .text(allData[counter].UVIndex)
        .style("color", "#80D4FF");

    updateData();





    //charts (TEST)
    createLineChart();

}



//#####################################TEST begin#######################################

function createLineChart() {

    var data = [];
    var width = 500;
    var height = 50;
    var globalX = 0;
    var duration = 200; //updaterate!!!
    var max = 500;
    var step = 1;
    var lineChart1 = d3.select('#pressure')
        .attr('width', width + 50)
        .attr('height', height + 50);

    var x = d3.scaleLinear()
        .domain([0, 500])
        .range([0, 500]); //fit to svg####

    var y = d3.scaleLinear()
        .domain([0, 2000])
        .range([100, 0]); //fit to svg..####
    // -----------------------------------

    var smoothLine = d3.line().curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.y);
        });
    // -----------------------------------
    // Draw the axis
    var xAxis = d3.axisBottom().scale(x);
    var axisX = lineChart1.append('g').attr('class', 'x axis')
        .attr('transform', 'translate(0, 500)')
        .call(xAxis);

    // Append line
    var path = lineChart1.append('path');


    // Main loop
    function tick() {

        // Generate new data
        var point = {
            x: globalX,
            y: (allData[counter].pressure)
        };
        data.push(point);
        globalX += step;
        // Draw new line
        path.datum(data)
            .attr('class', 'smoothline')
            .attr('d', smoothLine);


        // Shift the lineChart1 left
        x.domain([globalX - (max - step), globalX]);
        axisX.transition()
            .duration(duration)
            .ease(d3.easeLinear, .1)
            .call(xAxis);
        path.attr('transform', null)
            .transition()
            .duration(duration)
            .ease(d3.easeLinear, .1)
            .attr('transform', 'translate(' + x(globalX - max) + ')')
            .on('end', tick)
            // Remote old data (max 50 points)
        if (data.length > 50) data.shift();
    }

    tick();


}








//#####################################TEST END#######################################





function drawMap(world) {


    projection = d3.geoConicConformal().scale(1400).translate([400, 1200]);


    var path = d3.geoPath().projection(projection);
    var features = topojson.feature(world, world.objects.countries).features;

    var map = d3.select("#map");

    map.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("class", "countries")
        .attr("d", path)
        .attr("id", function(d, i) {
            return features[i].id;
        });
}



/* DATA LOADING */

//Load in json data to make map

d3.json("DataCruise/world.json", function(error, world) {
    if (error) {
        console.log(error); //Log the error.
        throw error;
    }
    //console.log("done");
    //draw the map
    drawMap(world);
});


// Load CSV file
d3.csv("DataCruise/mockup-cruise-entries.csv", function(error, csv) {
    if (error) {
        console.log(error); //Log the error.
        throw error;
    }

    csv.forEach(function(d) { //wenn sortiert dann einfach durchiterieren

        // Convert numeric values to 'numbers'
        d.appWindDir = +d.appWindDir;
        d.appWindSpeed = +d.appWindSpeed;
        d.computedWindDir = +d.computedWindDir;
        d.computedWindSpeed = +d.computedWindSpeed;
        d.distance = +d.distance;
        d.elevation = +d.elevation;
        d.humidity = +d.humidity;
        d.lat = +d.lat;
        d.lon = +d.lon;
        d.pressure = +d.pressure;
        d.shipDirection = +d.shipDirection;
        d.shipSpeed = +d.shipSpeed;
        d.solarRadiation = +d.solarRadiation;
        d.temperature = +d.temperature;
        d.time = d.time;
        d.UVIndex = +d.UVIndex;
        d.waterTemperature = +d.waterTemperature;




    });

    // Store csv data in a global variable
    allData = csv;

    //show data
    console.log(allData);

    //call methods
    drawArrowWind();
    drawArrowCompass();

    prepareHtml();
    displayData();


});