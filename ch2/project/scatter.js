window.addEventListener("load", plotMyData)

function makeDemo1() {                                         //<1>
    d3.tsv( "https://raw.githubusercontent.com/janert/d3-for-the-impatient/master/examples/examples-simple.tsv" )                            //<2>
        .then( function( data ) {                              //<3> <4>
            d3.select( "svg" )                                 //<5>
                .selectAll( "circle" )                         //<6>
                .data( data )                                  //<7>
                .enter()                                       //<8>
                .append( "circle" )                            //<9>
                .attr( "r", 5 ).attr( "fill", "red" )          //<10>
                .attr( "cx", function(d) { return d["x"] } )   //<11>
                .attr( "cy", function(d) { return d["y"] } );    
        } );
}

function plotMyData() {
    d3.csv("sampleData.csv")
        .then( function ( data ) {
            d3.select("#fig1")
            //d3.select( "svg" )                                 //<5>
            .selectAll("circle")
            .data( data )
            .enter()
            .append("circle")
            .attr("r", 5).attr("fill","red")
            .attr("cx", function(d) { return d["x"] } )
            .attr("cy", function(d) { return d["y"] } );
        console.log( data );
     } );
}


