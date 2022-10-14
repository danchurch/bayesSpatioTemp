window.addEventListener("load", main);

function main(){
  let url = "https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/geoMeanTmax.csv"
  d3.csv(url,d3.autoType).then(data => {

    // define size of data window 
    let [dataWidth, dataHeight] = [150,150];
    let [xbuffer,ybuffer] = [50, 50];
    let [svgWidth, svgHeight] = [dataWidth + 2*xbuffer,dataHeight + 2*ybuffer];
    let svg = d3.select('#plot').append('svg');
    svg.attr('width',svgWidth)
                 .attr('height',svgHeight)
                 .attr('id','plotSVG');

    // set axis/data scaling
    // x-axis would be longitude

    let xsc = d3.scaleLinear()
      .domain(d3.extent(data, d => d['long']))
      .range([0,dataWidth]);

    let ysc = d3.scaleLinear()
      .domain(d3.extent(data, d => d['meanSummerTmax']))
      .range([dataHeight, 0]);

    // scale function for datapoints //
    let scaleDat = function(oldData){
      newData = [];
      newData['x'] = xsc(oldData['long']);
      newData['y'] = ysc(oldData['meanSummerTmax']);
      return(newData);
      };

    // do the data rescale
    meanSummerTmaxScaled = data.map(scaleDat);
  
    // axes //
    let xAxMker = d3.axisBottom(xsc);
    let yAxMker = d3.axisLeft(ysc);

    //console.log(data);
    console.log(d3.extent(data, d => d['meanSummerTmax']));
    console.log(d3.extent( meanSummerTmaxScaled, d => d['y']));
    console.log(meanSummerTmaxScaled);
    
    // draw figures 
    let totalPlot = svg.append('g');

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
                .attr('cx', d => xsc(d['long']))
                .attr('cy', d => ysc(d['meanSummerTmax']))
                ;

    // move this into place
    totalPlot.attr('transform', `translate(${xbuffer},${ybuffer/2})`)

})}

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
// there is an extra layer of complexity if there are 
// multiple figures per svg. 
// I think for the moment, it is best to keep one figure 
// per one svg
// we can work more on tweaking multiple figures, etc,
// when we actually have to do layout, etc.

// so it seems like maybe best to define the data area first
// and keep it constant, and modify the size of the 
// margin and SVG as needed  

// 
