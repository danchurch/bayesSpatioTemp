window.addEventListener("load", main)

function main(){

  // base svg and svg props
  const width = 400, height = 400;
  let facetWidth = width; //for now
  let facetHeight = height; //for now
  let svg1 = d3.select("#plot").append('svg')
    .style("width", width)
    .style("height", height)
    .attr("id", "svg1");

  // projection and generator
  let projection = d3.geoAlbersUsa();
  let geoGenerator = d3.geoPath().projection(projection);

  // state drawing function:
  function renderStates(data, data2) {

    // get rid of non-contiguous states:
    let dontWant = ["Hawaii","Alaska","Puerto Rico"];
    data.features = data.features.filter(x => {return(!dontWant.includes(x.properties.name))});
    projection.fitSize([facetWidth, facetHeight], data); //have to do this before using projection in any functions!

    let pixes = data2.map(getPixFromLonLat);
    let statsXminPix = d3.min(pixes, d => d[0]);
    let statsXmaxPix = d3.max(pixes, d => d[0]);
    let statsYminPix = d3.min(pixes, d => d[1]);
    let statsYmaxPix = d3.max(pixes, d => d[1]);
    const clipRectBuff = 10;


    function getPixFromLonLat(lonlat){
        let pixCoords = projection([lonlat.lon, lonlat.lat]);
        return pixCoords;
        }

    svg1.append('g')
    .attr('id','statePaths')
    .attr('id','statePaths')
    .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('d', geoGenerator)
      .attr('fill', '#ffffff')
      .attr('stroke', '#000')


    svg1.append("rect")
      .attr("x", statsXminPix - clipRectBuff)
      .attr("y", statsYminPix - clipRectBuff)
      .attr('width', statsXmaxPix - statsXminPix + (2*clipRectBuff))
      .attr('height', statsYmaxPix - statsYminPix + (2*clipRectBuff))
      .attr('fill','none')
      .attr("style","fill:blue;stroke:black;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9");

    //svg1.append("circle")
    //  .attr("cx", statsXmaxPix)
    //  .attr("cy", statsYmaxPix)
    //  .attr("fill","purple")
    //  .attr("r","20");

    };
  // station plotting function:
  function drawStations(data){
    svg1.append("g").attr('id',"stationCircs")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("r", 5)
        .attr("fill", "red")
        .attr( "cx", d => projection([d.lon, d.lat])[0])
        .attr( "cy", d => projection([d.lon, d.lat])[1]);
  };


  // now do the rendering:
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA) {
      d3.csv("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv")
        .then(function(stationData){
           renderStates(mapUSA, stationData);
           drawStations(stationData);
    });
  });
} // end of main, anything past here is probably a mistake



//https://mappingwithd3.com/
//https://github.com/topojson/us-atlas
//https://www.d3indepth.com/geographic/

// this is the one to follow on next session:
//https://www.tutorialguruji.com/javascript/drawing-circles-via-d3js-and-converting-coordinates/

// check out projection.invert(), may be useful

