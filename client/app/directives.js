(function() {
  angular
    .module('foosballFrenzy')
    .directive('graphChart', function(d3Service, Players) {
      return {
        restrict: 'EA',
        scope: {},
        link: function(scope, element, attrs) {
          Players.getAllPlayers()
            .then(function(players) {
              var graph = {
                nodes: players,
                links: [
                  // {"source":1, "target":0, "value":6},
                  // {"source":1, "target":3, "value":2},
                  // {"source":1, "target":5, "value":0},
                  // {"source":2, "target":3, "value":1},
                  // {"source":3, "target":4, "value":2},
                  // {"source":3, "target":0, "value":1},
                  // {"source":4, "target":6, "value":0}
                ]
              };

              d3 = d3Service;
              var width = 960,
                  height = 500;

              var color = d3.scale.category20();

              var force = d3.layout.force()
                  .charge(-120)
                  .linkDistance(30)
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
                    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

                var node = svg.selectAll(".node")
                    .data(graph.nodes)
                  .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", function(d) {return Math.pow(d.rating, 1/4)})
                    .style("fill", function(d) { return color(2); })
                    .call(force.drag);

                    node.append("text")
                        .attr("dx", 12)
                        .attr("dy", ".35em")
                        .text(function(d) { return d.name });

                force.on("tick", function() {
                  link.attr("x1", function(d) { return d.source.x; })
                      .attr("y1", function(d) { return d.source.y; })
                      .attr("x2", function(d) { return d.target.x; })
                      .attr("y2", function(d) { return d.target.y; });

                  node.attr("cx", function(d) { return d.x; })
                      .attr("cy", function(d) { return d.y; });
                });
            })
        }
      };
    });
})();