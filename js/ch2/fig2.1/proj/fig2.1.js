window.addEventListener("load", main)

function main(){

// get data. We'll use the project version for now?
  //d3.json('data.geojson').then(function(bb) {
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json').then(function(bb) {
    let width = 200, height = 200;
    let projection = d3.geoAlbersUsa();
    projection.fitSize([width, height], bb);
    let geoGenerator = d3.geoPath()
    .projection(projection);
  
    let svg = d3.select("body").append('svg')
    .style("width", width).style("height", height);
  
    svg.append('g').selectAll('path')
    .data(bb.features)
    .join('path')
    .attr('d', geoGenerator)
    .attr('fill', '#088')
    .attr('stroke', '#000');
  });
}
//https://mappingwithd3.com/
//https://github.com/topojson/us-atlas
