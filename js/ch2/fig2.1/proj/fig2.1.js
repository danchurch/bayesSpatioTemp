window.addEventListener("load", main)

function main(){

// get data. We'll use the project version for now?
  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json').then(function(mapUSA) {

    // can we delete alaska, Puerto Rico and hawaii? they don't fit into the range of our data. 
    let dontWant = ["Hawaii","Alaska","Puerto Rico"];
    mapUSA.features = mapUSA.features.filter(x => {return(!dontWant.includes(x.properties.name))});


    // svg vars
    const width = 600, height = 600;

    // size of map facets
    let facetWidth = width; //for now
    let facetHeight = height; //for now

    // project
    let projection = d3.geoAlbersUsa();
    projection.fitSize([facetWidth, facetHeight], mapUSA);
    let geoGenerator = d3.geoPath()
    .projection(projection);

    let svg = d3.select("#plot").append('svg')
    .style("width", width).style("height", height);

  
    svg.append('g').selectAll('path')
    .data(mapUSA.features)
    .join('path')
    .attr('d', geoGenerator)
    .attr('fill', '#ffffff')
    .attr('stroke', '#000');

  });

}

//https://mappingwithd3.com/
//https://github.com/topojson/us-atlas


