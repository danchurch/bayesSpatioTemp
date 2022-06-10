window.addEventListener("load", main);

function main(){
  d3.csv('https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv')
    .then(function(stations){
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA) {
    const width = 400, height = 400;

    let polygon = { type: "Polygon", 
                  coordinates: [[
                                [-80.033333, 32.133335],
                                [-99.966667, 32.133335],
                                [-99.966667, 45.866665],
                                [-80.033333, 45.866665],
                                [-80.033333, 32.133335]
              ]]};
    let preclip = d3.geoClipPolygon(polygon); //this has to be sourced using special packages, see html


    let projection = d3.geoEquirectangular()
      .translate([width/2, height/2])
      .scale(1000)
      .center([-89.04423584210527, 38.66203010526314])
      .preclip(preclip)
      ;

    let geogenerator = d3.geoPath().projection(projection);

    let svg1 = d3.select("#plot").append('svg')
      .attr('id','svg1')
      .attr('width', width)
      .attr('height', height)
      ;

    let states = svg1.append('g')
        .attr("id", "states")
        .selectAll('path')
        .data(mapUSA.features)
        .join("path")
        .attr('d', geogenerator)
        .attr('fill','#ffffff')
        .attr('stroke','#000')
        ;

    //// add circle
    //let circleGenerator = d3.geoCircle()
    //  .center([-90, 40])
    //  .radius(10);
    //let circle = circleGenerator();
    // returns a GeoJSON object representing a circle
    //svg1.append('path').attr('d', geogenerator(circle));

    // look at bounding polygon
    svg1.append('g')
      .attr('id','boundingPolygon')
      .append('path').attr('d', geogenerator(polygon))
      .attr('fill','none')
      .attr('stroke','red')
      ;

    console.log(geogenerator(polygon));

    // how do we check if this point is within a polygon of a state?
    // for instance, pretty sure that texas contains the western-most
    // longitude (among other western states):
    // console.log(d3.min(stations, d => d.lon));
    // console.log(d3.max(stations, d => d.lon));

    // interesting, it looks like max means absolute values. so -99 > -80 ?
    // got to be careful with that, I guess.

    // does geoContains work here?
    //console.log(mapUSA);

    //console.log(stations.features);
    // alabama is path zero:
    //console.log(d3.geoContains(mapUSA.features[0], [-87,32]));
    // that works. can we filter with this?
    // filter with just one point:
    //let alabama = mapUSA.features.filter(d => d3.geoContains(d, [-87,32]));
    //console.log(alabama);
    //let texas = mapUSA.features.filter(d => d3.geoContains(d, [-100, 32]));
    //console.log(texas);

    // works. now how to extend this to an entire array of points?


    let justStationStates = mapUSA.features.filter(d => d3.geoContains(d, [[-87,32],[-100, 32]]));
    // nope

    // it feels like this should be useful somehow:
    //console.log(d3.geoBounds(mapUSA));
    // does this work for points? 
    //console.log(d3.geoBounds(stations));
    // nope

    // clipping IS possible, I just can't find good examples
    // seems like there are two approaches, pre and post projection
    // get max and min of states. Both pixels and lat/lon

    //console.log(d3.extent(stations, d => d.lon));
    //console.log(d3.extent(stations, d => d.lat));
    //console.log('lon');
    //console.log(d3.min(stations, d => d.lon));
    //console.log(d3.max(stations, d => d.lon));
    //console.log('lat');
    //console.log(d3.min(stations, d => d.lat));
    //console.log(d3.max(stations, d => d.lat));

    //d3.geoClipRectangle(x0, y0, x1, y1)
    // not sure why this exists? can't we just use a regular polygon:

})})} //end main

// whoah, that actually works. add this to the main map. 
// then modularize it somehow, so we can put three in a row.
// okay, these also look useful:
// https://observablehq.com/@fil/multipolygon-clipping
// https://observablehq.com/@d3/spherical-clipping

// https://www.d3indepth.com/geographic/

