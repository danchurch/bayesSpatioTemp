window.addEventListener("load", main);

function main(){
  d3.json("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/countiesGeoInc.GeoJSON").then(
    function drawCounties(counties){

        console.log(counties);

        // this also works, if we don't know the entire string:  
        //let bb = counties.features.filter( d => d.NAME == 'St. Louis');
        //let bb = counties.features.filter( d => d.properties.NAME.includes('Louis')); 
        //console.log(bb);
        // for some reason that returns two copies of St. Louis county
        // are there two entries in our data?
        // yup. removed the city itself upstream, in python


        const width = 100, height = 100;
        let projection = d3.geoEquirectangular()
            .translate([width/2, height/2])
            .scale(800)
            .center([-92.6, 38.47])
        ;
      
        let geogenerator = d3.geoPath().projection(projection); 

        let colScale = d3.scaleLog()
                           .domain([d3.min(counties.features, d => d.properties.X1970),
                                    d3.max(counties.features, d => d.properties.X1970)])
                           .range(['blue','yellow','red']);

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
            .attr('fill', d => colScale(d.properties.X1970))
            //.attr('fill','#ffffff')
            .attr('stroke','#000');

        // log color scale




        console.log(colScale([3282]));
        console.log(colScale([2832]));

});}
// end of main
