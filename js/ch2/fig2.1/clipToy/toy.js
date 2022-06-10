window.addEventListener("load", main);

function main(){
    svg1 = d3.select("#plot").append('svg')
      .attr('id','zoop')
      .attr('width','400')
      .attr('height','400');
    let zoopGroup = svg1.append('g');
    zoopGroup.append('clipPath')
      .attr('id','clippy');

    clipRect = d3.select('#clippy').append('rect')
      .attr('x', '10')
      .attr('y', '10')
      .attr('width', '200')
      .attr('height', '100');

    zoopGroup.append("circle")
      .attr('cx','110')
      .attr('cy','110')
      .attr('r','100')
      .attr('clip-path','url(#clippy)')
      ;
};

