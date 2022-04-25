// let's try working through the tutorials on:
// https://www.d3indepth.com/geographic/

window.addEventListener("load", main)

function main(){

  d3.json('https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json')
    .then(function(mapUSA){

      // make our svg
      let svg1 = d3.select('#map')
        .append('svg')
        .style('width', 400)
        .style('height', 400)
        .attr('id', 'svg1');
      
//      let projection = d3.geoEquirectangular()
//                        .center([-123,44])
//                        .translate([150,150])
//                        .scale(5000);

      //let projection = d3.geoEquirectangular();
      let projection = d3.geoEquirectangular();

      projection.fitSize([400,400], mapUSA);
      
      let geoGenerator = d3.geoPath()
        .projection(projection);
      
      let u = d3.select('#svg1')
        .selectAll('path')
        .data(mapUSA.features)
        .join('path')
        .attr('d', geoGenerator);

  })
  
}
