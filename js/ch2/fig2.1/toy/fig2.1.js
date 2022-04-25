window.addEventListener("load", main)

function main(){
  // base svg and svg props
  const width = 400, height = 400;
  let facetWidth = width; 
  let facetHeight = height; 
  let svg1 = d3.select("#plot").append('svg')
    .style("width", width)
    .style("height", height)
    .attr("id", "svg1");

  // projection and generator
  let projection = d3.geoAlbersUsa();
  let geoGenerator = d3.geoPath().projection(projection);

  // state drawing function:
  function renderStates(data) {

    projection.fitSize([facetWidth, facetHeight], data); 

    svg1.append('g')
    .attr('id','statePaths')
    .attr('id','statePaths')
    .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('d', geoGenerator)
      .attr('fill', '#ffffff')
      .attr('stroke', '#000')
    };

  // now do the rendering:
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA) {
           renderStates(mapUSA);
    });
} 
