window.addEventListener("load", main);

function main(){

// sample data:

  exData = [
            {"x":0, "y":0, "z":1},
            {"x":0, "y":1, "z":2},
            {"x":1, "y":0, "z":3},
            {"x":1, "y":1, "z":4},
           ];
  
  console.log(exData);

  let cnv = d3.select('#plot')
    .append("canvas")
    .attr('width', 400).attr('height', 400).attr('id', 'cnv');
  
  let ctx = cnv.node().getContext('2d');

  // example rectangles
  //ctx.fillStyle = "Red";
  //ctx.fillRect(10, 10, 100, 100);

  //ctx.fillStyle = "Blue";
  //ctx.fillRect(110, 10, 100, 100);

  // scale for colors
  let zSc = d3.scaleLinear()
    .domain(d3.extent(exData, d => d["x"]))  
    .range(["red","white","blue"]);
 
  // function for drawing a pixel:
  let drawPix = function(obj){
    console.log(obj.z)
    ctx.fillStyle = obj["z"];
    ctx.fillRect(obj["x"], obj["y"], 1, 1);
  }
   
  exData.forEach(drawPix)
}

// end of main

// so, we need to learn how to do heat maps

// how can we convert a matrix of values to a heat map? 

// general strategy - get data into an array of objects, with three properties: 
// x, y, z. Write a function that plots a 1-pixel rectangle for each object 
// in the array.  

// Janert then uses nested for loops, but couldn't we do this with "forEach()"?

// an svg solution is here: https://stackoverflow.com/questions/66661192/d3-heatmap-syntax
