window.addEventListener("load", main);

function main(){
  d3.csv('https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv')
    .then(function(stations){
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then( function(mapUSA) {
    const width = 400, height = 400;


    // bounding box directly from our station data:
    let xMinLL = d3.min(stations, d => +d.lon);
    let yMinLL = d3.min(stations, d => +d.lat);
    let xMaxLL = d3.max(stations, d => +d.lon);
    let yMaxLL = d3.max(stations, d => +d.lat);


    let projection = d3.geoEquirectangular()
      //.translate([width/2, height/2])
      .scale(1000)
      .center([-89.04423584210527, 38.66203010526314])
      ;

    // assign our pixel coordinates. Remember that y is flipped, up is down. 
    [xMinPix, yMaxPix] = projection([xMinLL, yMinLL]);
    [xMaxPix, yMinPix] = projection([xMaxLL, yMaxLL]);


    // use these as our new clipping coordinates. add a buffer or 5 pixels
    const buff = 5;
    projection.postclip(d3.geoClipRectangle(xMinPix - buff, 
                                            yMinPix - buff, 
                                            xMaxPix + buff, 
                                            yMaxPix + buff));

    let svg1 = d3.select("#plot").append('svg')
      .attr('id','svg1')
      .attr('width', width)
      .attr('height', height)
      ;

    let geogenerator = d3.geoPath().projection(projection);

    let smallXmax = (xMaxPix/3 + 2*buff + width/2);
    console.log(smallXmax);


    let states1 = svg1.append('g')
        .attr("id", "states1")
        .selectAll('path')
        .data(mapUSA.features)
        .join("path")
        .attr('d', geogenerator)
        .attr('fill','#ffffff')
        .attr('stroke','#000')
        .attr('transform','scale(0.333 0.333)')
        ;

    //let states2 = svg1.append('g')
    //    .attr("id", "states2")
    //    .selectAll('path')
    //    .data(mapUSA.features)
    //    .join("path")
    //    .attr('d', geogenerator)
    //    .attr('fill','#ffffff')
    //    .attr('stroke','#000')
    //    ;

    let states3 = svg1.append('g')
        .attr("id", "states3")
        .selectAll('path')
        .data(mapUSA.features)
        .join("path")
        .attr('d', geogenerator)
        .attr('fill','#ffffff')
        .attr('stroke','#000')
        .attr('transform','scale(0.333 0.333) translate('+smallXmax+' 0)')
        ;

})})}

// but how do we tile? As in, three maps, one svg
// or maybe three svgs?
// I think the first
// should be as simple as making a group out of the 
// the above 
// as in, run the above plotting function three 
// times, each in its own group
// then move and scale them into place.


