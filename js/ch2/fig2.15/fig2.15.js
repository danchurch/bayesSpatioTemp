window.addEventListener('load', main);

function main(){

d3.csv('grandTmaxMean.csv', d3.autoType).then( grandTmaxMean => {
  d3.csv('summer1993tmax.csv', d3.autoType).then( summer1993tmax => {
  
    // make our sandbox
    let [ figWidth, figHeight ] = [300,100];
    let [ xBuffer, yBuffer ] = [30, 30];
    let svg = d3.select('#plot').append('svg')
                              .attr('width', figWidth + xBuffer)
                              .attr('height', figHeight + yBuffer);
  
  
    // reusable scale function:
    let makeScales = function(data){
      let scales = {};
      scales.scX = d3.scaleLinear()
                .domain(d3.extent(data, d => d['day']))
                .range([0,figWidth]);
  
      scales.scY = d3.scaleLinear()
                .domain(d3.extent(data, d => d['temp']))
                .range([figHeight,0]);
      return(scales);
      };


    // reusable draw function
    let drawLine = function(data,groupName="",color='gray'){
        let scales =  makeScales(data);
        let pathData = d3.line()
                       .x(d => scales.scX(d['day']))
                       .y(d => scales.scY(d['temp']))
                       ;
      
      
        let lineGroup = svg.append('g')
                             .attr('id',`${groupName}`)
                             .attr('stroke', `${color}`)
                             .attr('fill', 'none')
                             ;
      
        lineGroup.append('path').attr('d', pathData(data));
        };


    //how can we iterate over an array of "dataframes"?
    // for example, extract one station and plot:

    let drawOneErrorLine = function(arr2obj){
      aa = Object.entries(arr2obj);
      bb = aa.map( d => ({['day']:+d[0], ['temp']:+d[1]}));
      drawLine(bb,"anotherLine", "green");
      }


    summer1993tmax.forEach(drawOneErrorLine);
    drawLine(grandTmaxMean,"grandTmaxLine", "black");
 
})})};

// these might be helpful for parsing the CSV a little better:
// https://riptutorial.com/d3-js/example/18426/loading-data-from-csv-files
// https://stackoverflow.com/questions/43393376/how-to-convert-object-json-to-a-d3-js-array-data
// https://github.com/d3/d3-fetch/blob/v3.0.1/README.md#csv
