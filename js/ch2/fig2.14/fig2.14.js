window.addEventListener("load", main);

function main(){
  let url = "https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/geoMeanTmax.csv"
  d3.csv(url,d3.autoType).then(data => {

    // we want two scatterplots. Temperature by long and temp by lat
    let [svgWidth, svgHeight] = [200,200];
    let buffer = 40;

    // temp by long:
    let tempByLongSVG = d3.select('#plot').append('svg');

    tempByLongSVG.attr('width',svgWidth)
                 .attr('height',svgHeight)
                 .attr('id','tempByLongSVG');
  
    // x-axis would be longitude
    console.log(data);

    let xsc = d3.scaleLinear()
      .domain(d3.extent(data, d => d['long']))
      .range([0,svgWidth - 2*buffer]);

    let ysc = d3.scaleLinear()
      .domain(d3.extent(data, d => d['meanSummerTmax']))
      .range([svgHeight - 2*buffer, 0]);

    // axes //
    let xAxMker = d3.axisBottom(xsc);
    let longBottom = tempByLongSVG.append('g')
                       .attr('id','longBottom')
                       .attr('transform',`translate(${buffer},${200-buffer})`)
                       .call(xAxMker.ticks(6))
                       .append('text').text("Metric")
                       ;

    let yAxMker = d3.axisLeft(ysc);
    let latLeft = tempByLongSVG.append('g')
                       .attr('id','latLeft')
                       .attr('transform',`translate(${buffer},${buffer})`)
                       .call(yAxMker)
                       ;


    // datapoints //
    let dataPoints = tempByLongSVG.append('g');
    dataPoints.selectAll('circle')
              .data(data)
              .join('circle')
                .attr('fill','black')
                .attr('r',3)
                .attr('cx', d => xsc(d['long']))
                .attr('cy', d => ysc(d['meanSummerTmax']))
                ;
    

})}
