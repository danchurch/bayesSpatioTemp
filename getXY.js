var svg = d3.select("svg");
svg.on("click", function() {
    console.log(d3.mouse(svg.node));
})
