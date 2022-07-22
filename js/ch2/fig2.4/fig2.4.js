window.addEventListener("load", main);

function main(){


  d3.json("https://raw.githubusercontent.com/danchurch/bayesSpatioTemp/main/dataSets/ch2/countiesGeoInc.GeoJSON").then(
    function drawCounties(counties){

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

        // to keep track of where things are:
        svg.on("click",d => console.log([d.clientX, d.clientY]));

      
        let countyPaths = svg.append('g')
          .attr('id','counties')
          .selectAll('path')
            .data(counties.features)
            .join('path')
            .attr('d', geogenerator)
            .attr('fill', d => colScale(d.properties.X1970))
            .attr('stroke','#000');

        // color bars aren't a builtin function. We have to make one from 
        // a line and a color scale
        // modifying example 8.2 from Janert:

        const cbarWidth = 10,
              x1 = 90,
              x2 = x1 + cbarWidth,
              colorBarLength = 35, // how long is the total colorbar?
              y1 = 20,
              y2 = y1 + colorBarLength

        // so create a range, based on number of bars?
        // each crossbar should be one pixel thick
        // so each y location corresponds 1-to-1 to a crossbar

        // data that we bind needs to be an array:
        let bars = d3.range(y1, y2);

        // now a scale these to our data minima and maxima
        let sc = d3.scaleLinear()
          .domain( [y1,y2])
          .range([ d3.min(counties.features, d => d.properties.X1970),
                   d3.max(counties.features, d => d.properties.X1970)])

        // now our colorscale should be able to accept this 

        let bar = svg.append('g')
          .attr('id' , 'colorBar')
            .selectAll('line')
            .data(bars)
            .join('line')
              .attr('style',"stroke-width:2")
              .attr('x1', x1).attr('x2', x2)
              .attr('y1', d => d)
              .attr('y2', d => d)
              .attr('stroke', 'purple')
              .attr('stroke', d => colScale(sc(d)))
              ;


        // several tasks remain for this figure - scale and repeat with other 
        // data, add text, etc, etc. But these are kind of not interesting. I need to keep 
        // keep moving...


});}
// end of main
