window.addEventListener("load", main);

function main(){
  let url = "https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/geoMeanTmax.csv"
  d3.csv(url,d3.autoType).then(data => {

    // define size of data window, buffer, svg
    let [dataWidth, dataHeight] = [150,150];
    let [xbuffer,ybuffer] = [50, 50];
    let [svgWidth, svgHeight] = [2*dataWidth + 4*xbuffer,dataHeight + 2*ybuffer];
    let svg = d3.select('#plot').append('svg');
    svg.attr('width',svgWidth)
                 .attr('height',svgHeight)
                 .attr('id','plotSVG');

    //////////// v plotting function etc v //////////////

    let makeScales = function(data, latOrLong){
      let allScales = {};
      allScales['xsc'] = d3.scaleLinear()
        .domain(d3.extent(data, d => d[latOrLong]))
        .range([0,dataWidth]);
    
      allScales['ysc'] = d3.scaleLinear()
        .domain(d3.extent(data, d => d['meanSummerTmax']))
        .range([dataHeight, 0]);
      return(allScales);
      };


  
    // drawing function //
    let drawPlot = function (latOrLong){
      // axes //
      let scales = makeScales(data, latOrLong);

      let scaleDat = function(data){
        newData = [];
        newData['x'] = scales['xsc'](data[latOrLong]);
        newData['y'] = scales['ysc'](data['meanSummerTmax']);
        return(newData);
        };

      meanSummerTmaxScaled = data.map(scaleDat);
      let xAxMker = d3.axisBottom(scales['xsc']);
      let yAxMker = d3.axisLeft(scales['ysc']);
      
      // draw figures 
      let totalPlot = svg.append('g')
                         //.attr('id','longPlot');
                         .attr('id',`${latOrLong}Plot`);
    
      let longBottom = totalPlot.append('g')
                         .attr('id','longBottom')
                         .attr('transform',`translate(0,${dataHeight})`)
                         .call(xAxMker.ticks(6))
                         .append('text').text("Metric")
                         ;
    
      let latLeft = totalPlot.append('g')
                         .attr('id','latLeft')
                         .call(yAxMker)
                         ;
    
      let dataPoints = totalPlot.append('g');
      dataPoints.selectAll('circle')
                .data(data)
                .join('circle')
                  .attr('fill','black')
                  .attr('r',3)
                  .attr('cx', d => scales['xsc'](d[latOrLong]))
                  .attr('cy', d => scales['ysc'](d['meanSummerTmax']))
                  ;
    
    }

    //////////// ^ plotting function etc ^ //////////////

    //////////// v longitude //////////////
    //let latOrLong = 'long';
    latOrLong = 'long';
    drawPlot(latOrLong);
    // move this into place

    let longPlot = d3.select(`#${latOrLong}Plot`)
      .attr('transform', `translate(${xbuffer},${ybuffer/2})`);
    longPlot.attr('transform', `translate(${xbuffer},${ybuffer/2})`)
    //////////// ^ longitude //////////////

    //////////// v latitude v //////////////
    latOrLong = 'lat';
    drawPlot(latOrLong);

    let onePlotWidth = dataWidth + 2*xbuffer;
    let latPlot = d3.select(`#${latOrLong}Plot`)
      .attr('transform', `translate(${onePlotWidth},${ybuffer/2})`);
    //////////// ^ latitude ^ //////////////


})}

console.log('zoop');
console.log(latOrLong);

// this is a mess. 
// what are best practices for generating a scatter plot?
// we need is to define various frames that we are using
// I guess conceptually, we have:
// 1. the area where data points are displayed, bounded
//    by the long axis of our axes. 
// 2. the margin between the inside edge of the axes (#1),
//    and the edge of the svg. It has to have enough space
//    for spaces and ticks.
// 3. the size of the svg.
// 

// tomorrow make the plotdraw function more re-useable
