window.addEventListener('load', main);

function main(){

d3.csv('grandTmaxMean.csv', d3.autoType).then( grandTmaxMean => {

  // make our sandbox
  let [ figWidth, figHeight ] = [300,100];
  let [ xBuffer, yBuffer ] = [30, 30];
  let svg = d3.select('#plot').append('svg')
                            .attr('width', figWidth + xBuffer)
                            .attr('height', figHeight + yBuffer);

  console.log(grandTmaxMean);

  // scales 

  let scX = d3.scaleLinear()
            .domain(d3.extent(grandTmaxMean, d => d['day']))
            .range([0,figWidth]);

  let scY = d3.scaleLinear()
            .domain(d3.extent(grandTmaxMean, d => d['tmaxMean']))
            .range([figHeight,0]);

  let pathData = d3.line()
                 .x(d => scX(d['day']))
                 .y(d => scY(d['tmaxMean']))
                 ;

  //console.log(pathData(grandTmaxMean));

  let grandMeanGroup = svg.append('g')
                       .attr('id','grandMean')
                       .attr('stroke', 'black')
                       .attr('fill', 'none')
                       ;

  grandMeanGroup.append('path').attr('d', pathData(grandTmaxMean));


 
})};
