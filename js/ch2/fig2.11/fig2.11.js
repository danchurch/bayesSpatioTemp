window.addEventListener("load", main);

function main(){
  let url = 'https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/latitude_hov_heatmapData.csv';
  d3.csv(url, d3.autoType)
    .then(function drawHovmuller(data){
  
    let [cWidth, cHeight] = [100,100];
  
    let cnv = d3.select('#plot')
      .append("canvas")
      .attr('width', cWidth).attr('height', cHeight).attr('id', 'cnv');
    
    let ctx = cnv.node().getContext('2d');
  
    // scale for x
    let xSc = d3.scaleLinear()
      .domain(d3.extent(data, d => d["x"]))  
      .range([0,100]);
    // scale for y
    let ySc = d3.scaleLinear()
      .domain(d3.extent(data, d => d["y"]))  
      .range([0,100]);
    // scale for colors
    // linear scale
    //let zSc = d3.scaleLinear()
    //  .domain(d3.extent(data, d => d["z"]))  
    //  .range(["blue","yellow","red"]);
    // sinebow:
    let zSc = d3.scaleSequential( t => d3.interpolateSinebow(2/3-3*t/4))
      .domain(d3.extent(data, d => d["z"]));
  
    // scalar for rectangle width
    [xmin, xmax] = d3.extent(data, d => d["x"]);
    pWidth = (cWidth - 1)/(xmax - xmin);
  
    // scale for rectangle height
  
    // make a new data array using these?:
    let scaleDat = function(oldData){
      newData = [];
      newData['x'] = xSc(oldData['x']);
      newData['y'] = ySc(oldData['y']);
      newData['z'] = zSc(oldData['z']);
      return(newData);
      };
  
    // function for drawing a pixel:
    let drawPix = function(obj){
      ctx.fillStyle = obj["z"];
      ctx.fillRect(obj["x"], obj["y"], pWidth, 1);
    }
  
    // scale the data
    let newdata = data.map(scaleDat);

    // draw it
    newdata.forEach(drawPix);

})}

// end of main
// an svg solutioN IS here: https://stackoverflow.com/questions/66661192/d3-heatmap-syntax
