window.addEventListener("load", main);

function main(){
  d3.json("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/MissouriCounties.GeoJSON").then(
    function drawCounties(counties){

        console.log(counties);

        const width = 100, height = 100;
        let projection = d3.geoEquirectangular()
            .translate([width/2, height/2])
            .scale(1000)
            .center([-92.6, 38.47])
        ;
      
        let geogenerator = d3.geoPath().projection(projection); 

        let svg = d3.select('#plot')
          .append('svg')
          .attr('width',width)
          .attr('height',height)
          ;      
      
        let countyPaths = svg.append('g')
          .attr('id','counties')
          .selectAll('path')
            .data(counties.features)
            .join('path')
            .attr('d', geogenerator)
            .attr('fill','#ffffff')
            .attr('stroke','#000');

});}
// end of main
