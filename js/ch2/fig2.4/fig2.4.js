window.addEventListener("load", main);

function main(){
  d3.json("MissouriCounties.GeoJSON").then(
    function drawCounties(counties){
        const width = 100, height = 100;
        //let projection = d3.geoEquirectangular()
        //    .translate([width/2, height/2])
        //    .scale(1000)
        //    .center([-92.6, 38.47])
        //;
      
        //let geogenerator = d3.geoPath().projection(projection); 
      
      
});}
// end of main
