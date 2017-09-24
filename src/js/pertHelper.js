function deletePert() {
    if(typeof(myDiagram) != undefined){
        myDiagram = null;
        $('#pert-container').replaceWith('<div id="pert-container"></div>');
    }
}

function buildPert() {
    var pert = go.GraphObject.make;  // for more concise visual tree definitions

    // colors used, named for easier identification
    var blue = "#0288D1";
    var pink = "#B71C1C";
    var pinkfill = "#F8BBD0";
    var bluefill = "#B3E5FC";

    myDiagram =
      pert(go.Diagram, "pert-container",
        {
          initialAutoScale: go.Diagram.Uniform,
          initialContentAlignment: go.Spot.Center,
          layout: pert(go.LayeredDigraphLayout)
        });

    // The node template shows the activity name in the middle as well as
    // various statistics about the activity, all surrounded by a border.
    // The border's color is determined by the node data's ".critical" property.
    // Some information is not available as properties on the node data,
    // but must be computed -- we use converter functions for that.
    myDiagram.nodeTemplate =
      pert(go.Node, "Auto",
        pert(go.Shape, "Rectangle",  // the border
          { fill: "white", strokeWidth: 2 },
          new go.Binding("fill", "critical", function (b) { return (b ? pinkfill : bluefill ); }),
          new go.Binding("stroke", "critical", function (b) { return (b ? pink : blue); })),
        pert(go.Panel, "Table",
          { padding: 0.5 },
          pert(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
          pert(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
          pert(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: "white", coversSeparators: true }),
          pert(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
          pert(go.TextBlock, // earlyStart
            new go.Binding("text", "earlyStart"),
            { row: 0, column: 0, margin: 5, textAlign: "center" }),
          pert(go.TextBlock,
            new go.Binding("text", "length"),
            { row: 0, column: 1, margin: 5, textAlign: "center" }),
          pert(go.TextBlock,  // earlyFinish
            new go.Binding("text", "",
                           function(d) { return (d.earlyStart + d.length).toFixed(2); }),
            { row: 0, column: 2, margin: 5, textAlign: "center" }),

          pert(go.TextBlock,
            new go.Binding("text", "text"),
            { row: 1, column: 0, columnSpan: 3, margin: 5,
              textAlign: "center", font: "bold 14px sans-serif" }),

          pert(go.TextBlock,  // lateStart
            new go.Binding("text", "",
                           function(d) { return (d.lateFinish - d.length).toFixed(2); }),
            { row: 2, column: 0, margin: 5, textAlign: "center" }),
          pert(go.TextBlock,  // slack
            new go.Binding("text", "",
                           function(d) { return (d.lateFinish - (d.earlyStart + d.length)).toFixed(2); }),
            { row: 2, column: 1, margin: 5, textAlign: "center" }),
          pert(go.TextBlock, // lateFinish
            new go.Binding("text", "lateFinish"),
            { row: 2, column: 2, margin: 5, textAlign: "center" })
        )  // end Table Panel
      );  // end Node

    // The link data object does not have direct access to both nodes
    // (although it does have references to their keys: .from and .to).
    // This conversion function gets the GraphObject that was data-bound as the second argument.
    // From that we can get the containing Link, and then the Link.fromNode or .toNode,
    // and then its node data, which has the ".critical" property we need.
    //
    // But note that if we were to dynamically change the ".critical" property on a node data,
    // calling myDiagram.model.updateTargetBindings(nodedata) would only update the color
    // of the nodes.  It would be insufficient to change the appearance of any Links.
    function linkColorConverter(linkdata, elt) {
      var link = elt.part;
      if (!link) return blue;
      var f = link.fromNode;
      if (!f || !f.data || !f.data.critical) return blue;
      var t = link.toNode;
      if (!t || !t.data || !t.data.critical) return blue;
      return pink;  // when both Link.fromNode.data.critical and Link.toNode.data.critical
    }

    // The color of a link (including its arrowhead) is red only when both
    // connected nodes have data that is ".critical"; otherwise it is blue.
    // This is computed by the binding converter function.
    myDiagram.linkTemplate =
      pert(go.Link,
        { toShortLength: 6, toEndSegmentLength: 20 },
        pert(go.Shape,
          { strokeWidth: 4 },
          new go.Binding("stroke", "", linkColorConverter)),
        pert(go.Shape,  // arrowhead
          { toArrow: "Triangle", stroke: null, scale: 1.5 },
          new go.Binding("fill", "", linkColorConverter))
      );

    // here's the data defining the graph
    var nodeDataArray = [
      { key: 1, text: "Start", length: 0, earlyStart: 0, lateFinish: 0, critical: true },
      { key: 2, text: "a", length: 4, earlyStart: 0, lateFinish: 4, critical: true },
      { key: 3, text: "b", length: 5.33, earlyStart: 0, lateFinish: 9.17, critical: false },
      { key: 4, text: "c", length: 5.17, earlyStart: 4, lateFinish: 9.17, critical: true },
      { key: 5, text: "d", length: 6.33, earlyStart: 4, lateFinish: 15.01, critical: false },
      { key: 6, text: "e", length: 5.17, earlyStart: 9.17, lateFinish: 14.34, critical: true },
      { key: 7, text: "f", length: 4.5, earlyStart: 10.33, lateFinish: 19.51, critical: false },
      { key: 8, text: "g", length: 5.17, earlyStart: 14.34, lateFinish: 19.51, critical: true },
      { key: 9, text: "Finish", length: 0, earlyStart: 19.51, lateFinish: 19.51, critical: true }
    ];
    var linkDataArray = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 6 },
      { from: 5, to: 7 },
      { from: 6, to: 8 },
      { from: 7, to: 9 },
      { from: 8, to: 9 }
    ];
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    // create an unbound Part that acts as a "legend" for the diagram
    myDiagram.add(
      pert(go.Node, "Auto",
        pert(go.Shape, "Rectangle",  // the border
          { fill: bluefill } ),
        pert(go.Panel, "Table",
          pert(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
          pert(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
          pert(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: bluefill, coversSeparators: true }),
          pert(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
          pert(go.TextBlock, "Early Start",
            { row: 0, column: 0, margin: 5, textAlign: "center" }),
          pert(go.TextBlock, "Length",
            { row: 0, column: 1, margin: 5, textAlign: "center" }),
          pert(go.TextBlock, "Early Finish",
            { row: 0, column: 2, margin: 5, textAlign: "center" }),

          pert(go.TextBlock, "Activity Name",
            { row: 1, column: 0, columnSpan: 3, margin: 5,
              textAlign: "center", font: "bold 14px sans-serif" }),

          pert(go.TextBlock, "Late Start",
            { row: 2, column: 0, margin: 5, textAlign: "center" }),
          pert(go.TextBlock, "Slack",
            { row: 2, column: 1, margin: 5, textAlign: "center" }),
          pert(go.TextBlock, "Late Finish",
            { row: 2, column: 2, margin: 5, textAlign: "center" })
        )  // end Table Panel
      ));
  }