window.addEventListener("load", main)

function main(){

  // base svg and svg props
  const width = 1200, height = 400;
  svgBase = d3.select('#map')
    .attr('width', width)
    .attr('height', height);

  // projection and generator
  let projection = d3.geoEquirectangular()
    .center([-89.04423584210527, 38.66203010526314])
    .translate([width/2, height/2])
    .scale(1000)
    ;
  let geoGenerator = d3.geoPath().projection(projection);

  // function to center and scale based on extent of station data:
  function getCenterExtent(stationData) {
    let allLats = stationData.map( d => d.lat );
    let allLons = stationData.map( d => d.lon );
    let centersLatLon = {"lon":d3.mean(allLons), "lat":d3.mean(allLats)};
    return(centersLatLon);
  };

  // function to get the min/max of the temperature data:
  function getTempRange(stationData) {
    let temps = stationData.map( d => d.z );
    let tempRange = [ d3.min(temps), d3.mean(temps), d3.max(temps) ];
    return(tempRange);
  }


  // state drawing function:
  function renderStates(stateData, stationData, thisMap) {
    let centerCoords = getCenterExtent(stationData); 
    projection.center([centerCoords.lon, centerCoords.lat]);
    thisMap.append('g')
    .attr('class','statePaths')
    .selectAll('path')
      .data(stateData.features)
      .join('path')
      .attr('d', geoGenerator)
      .attr('fill', '#ffffff')
      .attr('stroke', '#000');
    };

  // station plotting function:
  function drawStations(stationData, thisMap){
    let stationDataToday = stationData.filter( today => +stationData.day == 1 );
    //console.log(stationDataToday);
    //console.log(stationData.day);

  let cities = [
      {name: 'Los Angeles', population: 3792621},
      {name: 'New York', population: 8175133},
      {name: 'Chicago', population: 2695598},
      {name: 'Houston', population: 2099451},
      {name: 'Philadelphia', population: 1526006}
  ];

    console.log(cities);
    console.log(cities.filter(city => city.population > 3000000));





    let colorSc = d3.scaleLinear()
        .domain(getTempRange(stationData))
        .range(['green','yellow','red']);
    thisMap.append("g").attr('class',"stationCircs")
      .selectAll("circle")
      .data(stationData)
      .enter()
      .append("circle")
        .attr("r", 2)
        .attr("fill", d => colorSc(d.z))
        .attr( "cx", d => projection([d.lon, d.lat])[0])
        .attr( "cy", d => projection([d.lon, d.lat])[1]);
  };

  // add graticules
  function addGraticules(thisMap){
    let graticuleGenerator = d3.geoGraticule();
    let graticules = graticuleGenerator();
    thisMap.append("g").attr('class',"graticules")
      .append("path")
        .attr('d', geoGenerator(graticules))
        .attr('fill', '#ffffff')
        .attr('stroke', 'CadetBlue');
    }

  function clipByStations(stationData) {
    let xMinLL = d3.min(stationData, d => +d.lon);
    let yMinLL = d3.min(stationData, d => +d.lat);
    let xMaxLL = d3.max(stationData, d => +d.lon);
    let yMaxLL = d3.max(stationData, d => +d.lat);

    [xMinPix, yMaxPix] = projection([xMinLL, yMinLL]);
    [xMaxPix, yMinPix] = projection([xMaxLL, yMaxLL]);

    const buff = 5;
    projection.postclip(d3.geoClipRectangle(xMinPix - buff,
                                            yMinPix - buff,
                                            xMaxPix + buff,
                                            yMaxPix + buff));
    }


  function make1map(stateData, stationData, mapName){
         clipByStations(stationData);
         let thisMap = d3.select("#map").append('g'); //make group to work on
         thisMap.attr("id", mapName);
         renderStates(stateData, stationData, thisMap);
         drawStations(stationData, thisMap);
         addGraticules(thisMap);
  };


  // now do the rendering:
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(stateData) {
      d3.csv("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/js/ch2/fig2.1/Tmax_1.csv")
        .then(function(stationData){
           make1map(stateData, stationData,'firstMap');
           make1map(stateData, stationData,'secondMap');
           make1map(stateData, stationData,'thirdMap');
           firstMap = d3.select('#firstMap');
           firstMap.attr('transform','scale(0.33 0.33) translate(' 
                                    + -firstMap.node().getBBox().x + ' 0)');
           secondMap = d3.select('#secondMap');
           secondMap.attr('transform','scale(0.33 0.33)');
           thirdMap = d3.select('#thirdMap');
           thirdMap.attr('transform','scale(0.33 0.33) translate(400 0)');
           console.log(stationData);
    });
  });
} // end of main, anything past here is probably a mistake

//https://www.d3indepth.com/geographic/

// how do we update the data sources 

