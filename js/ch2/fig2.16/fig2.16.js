window.addEventListener('load', main);

function main(){

d3.csv("lagZeroHeatMap.csv", d3.autoType).then( lagZeroMat => {
  console.log(lagZeroMat);
  
  // total window size:
  let [ figWidth, figHeight ] = [500, 500 ];
  // heatmap size:
  let [ mapWidth, mapHeight ] = [300, 300 ];

  // set pixel size
  [xmin, xmax] = d3.extent(lagZeroMat, d => d["x"]);

  pWidth = (mapWidth)/(xmax - xmin);

  console.log("zoop"+pWidth);

  // put in a canvas
  cnv = d3.select("#plot")
      .append("canvas")
      .attr("width", figWidth)
      .attr("height", figHeight);

  // set drawing style
  let ctx = cnv.node().getContext('2d');

  // scale for x
  let xSc = d3.scaleLinear()
      .domain(d3.extent(lagZeroMat, d => d["x"]))
      .range([0,mapWidth]);

  // scale for y
  let ySc = d3.scaleLinear()
    .domain(d3.extent(lagZeroMat, d => d["y"]))
    .range([mapHeight,0]);

  // sinebow for z
  let zSc = d3.scaleSequential( t => d3.interpolateSinebow(2/3-3*t/4))
    .domain(d3.extent(lagZeroMat, d => d["z"]));

  // function to use these:
  let scaleData = function(oldData){
    let newData = [];
    newData['x'] = xSc(oldData['x']);
    newData['y'] = ySc(oldData['y']);
    newData['z'] = zSc(oldData['z']);
    return(newData);
    }

  // function to draw a pixel:
  let drawPix = function(obj){
    ctx.fillStyle = obj['z'];
    ctx.fillRect(obj['x'], obj['y'], pWidth, pWidth);
    };

  // draw it
  let newData = lagZeroMat.map(scaleData);
  newData.forEach(drawPix);

})};
