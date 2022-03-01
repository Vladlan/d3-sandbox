var app = angular.module("myApp", []);

app.controller("MainCtrl", function ($scope) {
  $scope.chartData = {
    topDimensionMix: [
      {
        tableData: {
          id: "MEASURE5",
          delta: "$0",
          name: "Revenue",
          recommended: 550000,
          increasePercent: "37",
          projected: "$0",
        },
        heirarchy: [
          {
            tableData: {
              id: "MEASURE5",
              delta: "$0",
              name: "Revenue",
              recommended: "$0",
              increasePercent: "N/A",
              projected: "$0",
            },
            scopeId: 156,
            dimensionId: "DIM8",
            scopeName: "Unknown",
          },
        ],
        scopeId: 246750,
        dimensionName: "DIM3",
        scopeName: "BidManager_Campaign_DO_NOT_EDIT_0",
      },
      {
        tableData: {
          id: "MEASURE5",
          delta: "$0",
          name: "Revenue",
          recommended: 370000,
          increasePercent: "24",
          projected: "$0",
        },
        heirarchy: [
          {
            tableData: {
              id: "MEASURE5",
              delta: "$0",
              name: "Revenue",
              recommended: "$0",
              increasePercent: "N/A",
              projected: "$0",
            },
            scopeId: 156,
            dimensionId: "DIM8",
            scopeName: "Unknown",
          },
        ],
        scopeId: 566783,
        dimensionName: "DIM3",
        scopeName: "Crisp Test Campaign",
      },
      {
        tableData: {
          id: "MEASURE5",
          delta: "$0",
          name: "Revenue",
          recommended: 260000,
          increasePercent: "17",
          projected: "$0",
        },
        heirarchy: [
          {
            tableData: {
              id: "MEASURE5",
              delta: "$0",
              name: "Revenue",
              recommended: "$0",
              increasePercent: "N/A",
              projected: "$0",
            },
            scopeId: 103,
            dimensionId: "DIM8",
            scopeName: "NA",
          },
        ],
        scopeId: 673013,
        dimensionName: "DIM3",
        scopeName:
          "SOCIALMEDIA-_-P4ID-_-20141118-_-INSTAGRAM-_-D27-_-ALWAYS-ON-_-LIKE2BUYPETDROPCAM",
      },
      {
        tableData: {
          id: "MEASURE5",
          delta: "$0",
          name: "Revenue",
          recommended: 210000,
          increasePercent: "13",
          projected: "$0",
        },
        heirarchy: [
          {
            tableData: {
              id: "MEASURE5",
              delta: "$0",
              name: "Revenue",
              recommended: "$210000",
              increasePercent: "13",
              projected: "$0",
            },
            scopeId: 103,
            dimensionId: "DIM8",
            scopeName: "NA",
          },
        ],
        scopeId: 747705,
        dimensionName: "DIM3",
        scopeName:
          "SOCIALMEDIA-_-P4ID-_-PINTEREST-_-RALPH-LAUREN-CAMINO-_-D24-_-205183045-_-LIFESTYLE-_-PIP-_-VENDOR-_-20140603",
      },
      {
        tableData: {
          id: "MEASURE5",
          delta: "$0",
          name: "Revenue",
          recommended: 90000,
          increasePercent: "8",
          projected: "$0",
        },
        heirarchy: [
          {
            tableData: {
              id: "MEASURE5",
              delta: "$0",
              name: "Revenue",
              recommended: "$90000",
              increasePercent: "8",
              projected: "$0",
            },
            scopeId: 103,
            dimensionId: "DIM8",
            scopeName: "NA",
          },
        ],
        scopeId: 772501,
        dimensionName: "DIM3",
        scopeName:
          "SOCIALMEDIA-_-P4ID-_-20141118-_-FACEBOOK-_-D27-_-ALWAYS-ON-_-PETDROPCAM",
      },
    ],
  };

  $scope.color = ["#43a048", "#F45322", "#ccdc39", "#8d24aa", "#3948ab"];

  $scope.hoverIn = function (_index) {
    var sel = d3.selectAll(".arc").filter(function (d) {
      return d.data.id === _index;
    });
    this.mouseOverPath.call(sel.select("path")[0][0], sel.datum());
  };

  $scope.hoverOut = function (_index) {
    var sel = d3.selectAll(".arc").filter(function (d) {
      return d.data.id === _index;
    });
    this.mouseOutPath.call(sel.select("path")[0][0], sel.datum());
  };
});

app.directive("donutChart", function () {
  return {
    restrict: "EA",
    replace: true,
    template: '<div id="chart"></div>',
    link: function (scope, element, attrs) {
      var chartConfig = {
        width: 300,
        height: 300,
        thickness: 20,
        grow: 18,
        labelPadding: 20,
        labelPaddingOver: 42,
        duration: 200,
        margin: {
          top: 50,
          right: 20,
          bottom: 60,
          left: 20,
        },
      };

      function getChartData(_data) {
        return {
          center: {
            label: "Revenue Lift",
            value: 1520000,
          },
          values: _data,
        };
      }

      function init() {
        var chartData = getChartData(scope.chartData.topDimensionMix);
        chartData.values.forEach(function (d) {
          d.id = d.scopeId;
          d.label = d.scopeName;
          d.value = +d.tableData.increasePercent;
          d.revenue = +d.tableData.recommended;
        });
        d3ChartEl = d3.select(element[0]);
        chartConfig.width =
          parseInt(d3ChartEl.style("width")) || chartConfig.width;
        chartConfig.height =
          parseInt(d3ChartEl.style("height")) || chartConfig.height;
        drawChart(chartData, chartConfig);
      }

      function drawChart(chartData, chartConfig) {
        var width = chartConfig.width,
          height = chartConfig.height,
          margin = chartConfig.margin,
          grow = chartConfig.grow,
          labelRadius,
          radius,
          duration = chartConfig.duration;

        width = width - margin.left - margin.right;
        (height = height - margin.top - margin.bottom),
          (radius = Math.min(width, height) / 2),
          (labelRadius = radius + chartConfig.labelPadding);

        var color = d3.scale
          .ordinal()
          .domain(
            chartData.values.map(function (item) {
              return item.label;
            })
          )
          .range(scope.color);

        var thickness = chartConfig.thickness || Math.floor(radius / 5);

        var arc = d3.svg
          .arc()
          .outerRadius(radius)
          .innerRadius(radius - thickness);

        var arcOver = d3.svg
          .arc()
          .outerRadius(radius + grow)
          .innerRadius(radius - thickness);

        var formatNumber = d3.format("s");

        var pieFn = d3.layout
          .pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });

        var centerLabel = !!chartData.center.label
            ? chartData.center.label
            : "",
          centerValue = !!chartData.center.value ? chartData.center.value : "";

        var d3ChartEl = d3.select(element[0]);

        scope.mouseOverPath = function (d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .each("start", function (d) {
              labelRadius = radius + chartConfig.labelPaddingOver;
              d3.select(this.parentNode)
                .select(".legend")
                .transition()
                .attr("transform", function (d) {
                  var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    height = Math.sqrt(x * x + y * y);
                  return (
                    "translate(" +
                    (x / height) * labelRadius +
                    "," +
                    (y / height) * labelRadius +
                    ")"
                  );
                });
            })
            .each("end", function (d) {
              var campaignid = d3.select(this).datum().data.id;
              var selected = d3.selectAll(".arc path").filter(function (d) {
                return d.data.id !== campaignid;
              });

              // selected
              //   .transition()
              //   .duration(duration)
              //   .style("fill-opacity", .2);

              d3.select(this.parentNode)
                .select(".legend .revenue")
                .transition()
                .style("fill-opacity", 1);

              var sel = d3
                .select(".campaign-list")
                .selectAll('.campaign[data-campaignid="' + campaignid + '"]');
              sel.classed("selected", true);
            })
            .attr("d", arcOver);
        };

        scope.mouseOutPath = function (d) {
          d3.select(this)
            .transition()
            .each("start", function (d) {
              labelRadius = radius + chartConfig.labelPadding;

              d3.select(this.parentNode)
                .select(".legend")
                .transition()
                .attr("transform", function (d) {
                  var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    height = Math.sqrt(x * x + y * y);
                  return (
                    "translate(" +
                    (x / height) * labelRadius +
                    "," +
                    (y / height) * labelRadius +
                    ")"
                  );
                });
            })
            .each("end", function (d) {
              var campaignid = d3.select(this).datum().data.id;
              var selected = d3.selectAll(".arc path").filter(function (d) {
                return d.data.id !== campaignid;
              });

              // selected
              //   .transition()
              //   .duration(duration)
              //   .style("fill-opacity", 1);

              d3.selectAll(".arc .legend .revenue")
                .transition()
                .style("fill-opacity", 0);

              var campaignid = d3.select(this).datum().data.id;
              var sel = d3.select(".campaign-list").selectAll(".campaign");
              sel.classed("selected", false);
            })
            .attr("d", arc);
        };

        d3ChartEl.select("svg").remove();

        var gRoot = d3ChartEl
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g");
        gRoot.attr(
          "transform",
          "translate(" +
            (width / 2 + margin.left) +
            "," +
            (height / 2 + margin.top) +
            ")"
        );

        var middleCircle = gRoot
          .append("svg:circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", radius)
          .style("fill", "#fff");

        var arcs = gRoot
          .selectAll("g.arc")
          .data(pieFn(chartData.values))
          .enter()
          .append("g")
          .attr("class", "arc");

        var partition = arcs
          .append("svg:path")
          .style("fill", function (d) {
            return color(d.data.label);
          })
          .style("stroke", "#fff")
          .attr("data-arc-data", function (d) {
            return d.data.value;
          })
          .on("mouseover", scope.mouseOverPath)
          .on("mouseout", scope.mouseOutPath)
          .each(function () {
            this._current = {
              startAngle: 0,
              endAngle: 0,
            };
          })
          .attr("d", arc)
          .transition()
          .duration(1000)
          .attrTween("d", function (d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
              return arc(interpolate(t));
            };
          })
          .each("end", function (d) {
            d3.selectAll(".arc text")
              .transition()
              .delay(duration)
              .style("fill-opacity", 1);
          });

        var legend = arcs
          .append("svg:text")
          .style("fill-opacity", 0)
          .attr("class", "legend")
          .attr("transform", function (d) {
            var c = arc.centroid(d),
              x = c[0],
              y = c[1],
              height = Math.sqrt(x * x + y * y);
            return (
              "translate(" +
              (x / height) * labelRadius +
              "," +
              (y / height) * labelRadius +
              ")"
            );
          })
          .attr("text-anchor", function (d) {
            return (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start";
          });

        legend
          .append("tspan")
          .attr("class", "percentage")
          .attr("x", 0)
          .text(function (d, i) {
            return d.value + "%";
          });

        legend
          .append("tspan")
          .attr("class", "revenue")
          .attr("x", 0)
          .attr("dy", "1em")
          .style("fill-opacity", 0)
          .text(function (d, i) {
            return "$" + formatNumber(d.data.revenue);
          });

        var centerText = gRoot.append("svg:text").attr("class", "center-label");

        centerText
          .append("tspan")
          .text("$" + formatNumber(centerValue))
          .attr("x", 0)
          .attr("dx", "-0.1em")
          .attr("class", "center-value");
        centerText
          .append("tspan")
          .text(centerLabel)
          .attr("x", 0)
          .attr("dy", "1.4em")
          .attr("class", "center-text");
      }

      init();
    },
  };
});
