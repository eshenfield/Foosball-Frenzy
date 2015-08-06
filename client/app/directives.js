(function() {
  angular
    .module('foosballFrenzy')
    .directive('graphChart', function(d3Service, Players, Matches) {
      return {
        restrict: 'EA',
        scope: {},
        link: function(scope, element, attrs) {
          Players.getAllPlayers()
            .then(function(players) {
              Matches.getLinkMap()
              .then(function(links) {
                var graph = {
                  nodes: players,
                  links: links
                };

                d3 = d3Service;
                var width = 960,
                    height = 500;

                var color = d3.scale.category20c();

                var force = d3.layout.force()
                    .charge(-120)
                    .linkDistance(200)
                    .size([width, height]);

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height);

                  force
                      .nodes(graph.nodes)
                      .links(graph.links)
                      .start();

                  var link = svg.selectAll(".link")
                      .data(graph.links)
                      .enter().append("line")
                      .attr("class", "link")
                      .style("stroke-width", function(d) { return d.value.length });

                  var node = svg.selectAll(".node")
                      .data(graph.nodes)
                      .enter().append("g")
                      .attr("class", "node")
                      .call(force.drag);

                      node.append("circle")
                          .attr("r", function(d) { return Math.pow(d.rating, 1/3); })
                          .style("fill", function(d) { return color(d.rating); })
                          .attr("x", -8)
                          .attr("y", -8)
                          .attr("width", 16)
                          .attr("height", 16);

                      node.append("text")
                          .attr("dx", 12)
                          .attr("dy", ".35em")
                          .text(function(d) { return d.name });

                  force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                  });
              });
            });
        }
      };
    });
})();