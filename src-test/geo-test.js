"use strict";

var GeoTest = TestCase("GeoTest");

/** Geo geometry helper **/

GeoTest.prototype.testPointInPolygon = function () {
    var point = [10,10];
    var polygon1 = [[0,0],[0,20],[20,20],[20,0],[0,0]];
    var polygon2 = [[0,0],[20,0],[9,10],[20,20],[0,20],[0,0]];
    var polygon3 = [[0,0],[20,0],[9,10],[20,20],[9,0],[0,0]];
    var polygon4 = [[0,0],[20,0],[9,10],[20,20],[21,0],[22,20],[23,0],[24,20],[25,0],[0,0]];
    var polygon5 = [[0,0],[20,0],[0,20],[0,0]];
    var polygon6 = [[10,20],[30,10],[10,10],[10,50],[10,20]];

    assertTrue("Point in Square",jsonOdm.Geo.pointWithinPolygon(point,polygon1));
    assertFalse("Point not in Square",jsonOdm.Geo.pointWithinPolygon(point,polygon2));
    assertTrue("Point in Square",jsonOdm.Geo.pointWithinPolygon(point,polygon3));
    assertTrue("Point in Square",jsonOdm.Geo.pointWithinPolygon(point,polygon4));
    assertTrue("Point on Path",jsonOdm.Geo.pointWithinPolygon(point,polygon5));
    assertTrue("Point on Vertex",jsonOdm.Geo.pointWithinPolygon(point,polygon6));
    assertTrue("Point on Vertex",jsonOdm.Geo.pointWithinPolygon([1,1], [[1,2],[3,1],[1,1],[1,5],[1,2]]));
};

GeoTest.prototype.testEdgeIntersectsEdge = function () {
    assertTrue("Intersects",jsonOdm.Geo.edgeIntersectsEdge(               [[0,0], [10,9] ],[[10,0] ,[0,9]]    ));
    assertTrue("Intersects",jsonOdm.Geo.edgeIntersectsEdge(               [[10,0],[0,10] ],[[0,0]  ,[10,10]]  ));
    assertTrue("Intersects in Vertex",jsonOdm.Geo.edgeIntersectsEdge(     [[0,0], [10,10]],[[0,0]  ,[11,10]]  ));
    assertTrue("Intersects in Vertex",jsonOdm.Geo.edgeIntersectsEdge(     [[0,0], [10,10]],[[1,0]  ,[10,10]]  ));
    assertTrue("Within each other",jsonOdm.Geo.edgeIntersectsEdge(        [[0,0], [10,10]],[[1,1]  ,[9,9]]    ));
    assertTrue("Within each other",jsonOdm.Geo.edgeIntersectsEdge(        [[1,1], [9,9]],  [[0,0]  ,[10,10]]  ));
    assertFalse("Parallel",jsonOdm.Geo.edgeIntersectsEdge(                [[0,0], [10,10]],[[1,0]  ,[11,10]]  ));
    assertFalse("Parallel",jsonOdm.Geo.edgeIntersectsEdge(                [[0,0], [10,10]],[[-1,0] ,[-11,-10]]));
    assertFalse("Intersects out of bounds",jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[-10,0],[-1,-10]] ));
    assertFalse("Intersects out of bounds",jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[2,0]  ,[11,10]]  ));
    assertFalse("Intersects out of bounds",jsonOdm.Geo.edgeIntersectsEdge([[0,1], [0,3]]  ,[[0,10] ,[10,10]]  ));
};

GeoTest.prototype.testEdgeIntersectsBounds = function () {
    assertTrue("no Points inside only edges",jsonOdm.Geo.edgeIntersectsBounds([[-1,0],[3,0]],[0,0,2,2]));
    assertTrue("Points inside",jsonOdm.Geo.edgeIntersectsBounds([[1,1],[1.5,1.5]],[0,0,2,2]));
    assertTrue("some Points inside",jsonOdm.Geo.edgeIntersectsBounds([[1,1],[8,1.5]],[0,0,2,2]));
    assertFalse("not intersecting",jsonOdm.Geo.edgeIntersectsBounds([[-1,0],[3,-1]],[0,0,2,2]));
};

GeoTest.prototype.testEdgeWithinPolygon = function () {
    assertTrue("Is inside",jsonOdm.Geo.edgeWithinPolygon([[1,1],[3,3]],[[0,0],[0,10],[10,10],[10,0]]));
    assertTrue("Is on an edge",jsonOdm.Geo.edgeWithinPolygon([[0,1],[0,3]],[[0,0],[0,10],[10,10],[10,0]]));
    assertFalse("Is on an edge but outside",jsonOdm.Geo.edgeWithinPolygon([[10,1],[10,11]],[[0,0],[0,10],[10,10],[10,0]]));
    assertFalse("Points inside but intersect",jsonOdm.Geo.edgeWithinPolygon([[2,5],[10,6]],[[0,0],[10,0],[10,10],[6,10],[6,4],[5,10],[0,10]]));
};

GeoTest.prototype.testPointOnLineString = function () {
    var point = [10,10];
    var line1 = [[0,0],[0,10],[10,10],[10,0]];
    var line2 = [[0,0],[0,20],[10,20],[10,19]];
    var line3 = [[0,0],[20,0],[0,20]];
    var line4 = [[0,0],[20,0],[20,20],[0,20]];

    assertTrue("Point in Line corner",jsonOdm.Geo.pointWithinLineString([1,1],[[3,1],[1,1]]));
    assertTrue("Point in Square corner",jsonOdm.Geo.pointWithinLineString(point,line1));
    assertFalse("Point on line but not on path",jsonOdm.Geo.pointWithinLineString(point,line2));
    assertTrue("Point on path but not on vertex",jsonOdm.Geo.pointWithinLineString(point,line3));
    assertFalse("Point just not on path",jsonOdm.Geo.pointWithinLineString(point,line4));
};

GeoTest.prototype.testDetectGeometry = function () {
    assertTrue("Detect as Point",       jsonOdm.Geo.detectAsGeometry([1,1])       instanceof jsonOdm.Geo.Point);
    assertTrue("Detect as BoundaryBox", jsonOdm.Geo.detectAsGeometry([1,1,3,3])   instanceof Array); // is an Array because constructor returns an array
    assertTrue("Detect as LineString",  jsonOdm.Geo.detectAsGeometry([[1,1]])     instanceof jsonOdm.Geo.LineString);
    assertTrue("Detect as Polygon",     jsonOdm.Geo.detectAsGeometry([[[1,1]]])   instanceof jsonOdm.Geo.Polygon);
    assertTrue("Detect as MultiPolygon",jsonOdm.Geo.detectAsGeometry([[[[1,1]]]]) instanceof jsonOdm.Geo.MultiPolygon);
};

/** Geo within **/

GeoTest.prototype.testPointInGeometry = function () {
    assertTrue("Point is in Point" ,      jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Point([1,1])));
    assertFalse("Point is not in Point" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Point([1,2])));

    assertTrue("Point is in bounds" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("Point is just in bounds" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.BoundaryBox([0,0,1,1])));
    assertFalse("Point is not in bounds" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.BoundaryBox([2,2,8,8])));

    assertTrue("Point is in LineString" ,      jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.LineString([[1,1],[1,2]])));
    assertFalse("Point is not in LineString" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.LineString([[2,1],[1,2]])));
    assertFalse("Point is not in LineString" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.LineString([1,1])));

    assertTrue("Point is in MultiLineString first" ,  jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("Point is in MultiLineString second" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]])));
    assertFalse("Point is not in MultiLineString" ,   jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])));
    assertFalse("Point is not in MultiLineString" ,   jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]])));

    assertTrue("Point is in Polygon on vertex" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]])));
    assertTrue("Point is in Polygon on path" ,   jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[0,2],[0,0]]])));
    assertTrue("Point is in Polygon inside" ,    jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("Point is not in Polygon" ,      jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("Point is in MultiPolygon[0] on vertex " , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("Point is in MultiPolygon[1] on vertex " , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("Point is in MultiPolygon[0] on path" ,    jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[0,2],[0,0]]],[[[0,0],[-2,0],[0,-2],[0,0]]]])));
    assertTrue("Point is in MultiPolygon[1] on path" ,    jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[0,-2],[0,0]]],[[[0,0],[2,0],[0,2],[0,0]]]])));
    assertTrue("Point is in MultiPolygon[0] inside" ,     jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("Point is in MultiPolygon[1] inside" ,     jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("Point is in MultiPolygon on vertex " ,   jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([-1,1]),new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("Point is in GeometryCollection[0]" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]]),
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("Point is in GeometryCollection[1]" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("Point is not in GeometryCollection" , jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testMultiPointInGeometry = function () {
    assertTrue("MultiPoint in Point edge case" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,2]]),new jsonOdm.Geo.Point([1,2])));
    assertFalse("MultiPoint not in Point" ,      jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,2],[2,1]]),new jsonOdm.Geo.Point([1,2])));

    assertTrue("MultiPoint is in bounds" ,      jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,2],[1,1]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("MultiPoint is just in bounds" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiPoint is not in bounds" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[-1,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));

    assertTrue("MultiPoint is in MultiPoint" ,      jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([[1,1],[1,2]])));
    assertFalse("MultiPoint is not in MultiPoint" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([[2,1],[1,2]])));
    assertFalse("MultiPoint is not in MultiPoint" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([1,1])));

    assertTrue("MultiPoint is in LineString" ,      jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,1],[1,2]])));
    assertFalse("MultiPoint is not in LineString" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[2,1],[1,2]])));
    assertFalse("MultiPoint is not in LineString" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([1,1])));

    assertTrue("MultiPoint is in MultiLineString first" ,  jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiPoint is in MultiLineString second" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[2,2],[1,3]],[[1,2],[1,1]]])));
    assertTrue("MultiPoint is in MultiLineString both" ,   jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[2,2],[1,1]]])));
    assertFalse("MultiPoint is not in MultiLineString" ,   jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[3,1],[1,5]]])));
    assertFalse("MultiPoint is not in MultiLineString" ,   jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]])));

    assertTrue("MultiPoint is in Polygon on vertex" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]])));
    assertTrue("MultiPoint is in Polygon on path" ,   jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[0,2],[0,0]]])));
    assertTrue("MultiPoint is in Polygon inside" ,    jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("MultiPoint is not in Polygon" ,      jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("MultiPoint is in MultiPolygon[0] on vertex " , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiPoint is in MultiPolygon[1] on vertex " , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("MultiPoint is in MultiPolygon[0] on path" ,    jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[0,2],[0,0]]],[[[0,0],[-2,0],[0,-2],[0,0]]]])));
    assertTrue("MultiPoint is in MultiPolygon[1] on path" ,    jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[0,-2],[0,0]]],[[[0,0],[2,0],[0,2],[0,0]]]])));
    assertTrue("MultiPoint is in MultiPolygon[0] inside" ,     jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("MultiPoint is in MultiPolygon[1] inside" ,     jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("MultiPoint is in MultiPolygon on vertex " ,   jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,0],[1,-1]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("MultiPoint is in GeometryCollection[0]" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]]),
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("MultiPoint is in GeometryCollection[1]" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("MultiPoint is not in GeometryCollection" , jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testLineStringInGeometry = function () {
    assertFalse("LineString cannot be in Point", jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,2],[2,1]]),new jsonOdm.Geo.Point([1,2])));
    assertFalse("LineString cannot be in MultiPoint", jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,2],[2,1]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]])));

    assertTrue("LineString is in bounds" ,      jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,2],[1,1]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("LineString is just in bounds" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[0,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("LineString is not in bounds" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[-1,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));

    assertTrue("LineString is in LineString" ,                 jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,1],[1,2]])));
    assertTrue("LineString is in LineString" ,                 jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,2],[1,1]])));
    assertTrue("LineString is in LineString" ,                 jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2],[1,1]]),new jsonOdm.Geo.LineString([[1,2],[1,1]])));
    assertTrue("LineString is in LineString" ,                 jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[2,1],[1,2],[1,1]])));
    assertFalse("LineString is not in LineString only Points", jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,2],[2,2],[1,1]])));
    assertFalse("LineString is not in LineString" ,            jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([1,1])));

    assertTrue("LineString is in MultiLineString first" ,  jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("LineString is in MultiLineString second" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[2,2],[1,3]],[[1,2],[1,1]]])));
    assertFalse("LineString is in MultiLineString both" ,  jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[2,2],[1,1]]])));
    assertFalse("LineString is not in MultiLineString" ,   jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[3,1],[1,5]]])));
    assertFalse("LineString is not in MultiLineString" ,   jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]])));

    assertTrue("LineString is in Polygon on vertex" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[3,1],[1,2]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]])));
    assertTrue("LineString is in Polygon inside" ,    jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("LineString intersects in Polygon" ,  jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[4,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("LineString is not in Polygon" ,      jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("LineString is in MultiPolygon[0] on vertex " , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[3,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("LineString is in MultiPolygon[1] on vertex " , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[3,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("LineString is in MultiPolygon[0] inside" ,     jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("LineString is in MultiPolygon[1] inside" ,     jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("LineString not in MultiPolygon" ,             jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[0,0],[1,-1]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("LineString is in GeometryCollection[0]" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[3,1],[1,1]]]),
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("LineString is in GeometryCollection[1]" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[2,2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("LineString is not in GeometryCollection" , jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testMultiLineStringInGeometry = function () {
    assertFalse("MultiLineString cannot be in Point", jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[2,1]]]),new jsonOdm.Geo.Point([1,2])));
    assertFalse("MultiLineString cannot be in MultiPoint", jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[2,1]]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]])));

    assertTrue("MultiLineString is in bounds" ,      jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[0,2],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiLineString is not in bounds" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[0,3],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiLineString is not in bounds" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[0,3],[1,1],[2,2],[0,1]],[[1,2],[1,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiLineString is not in bounds" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[0,3],[1,1],[2,2],[0,1]],[[1,2],[1,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,-2,-2])));

    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]],[[1,2],[1,1],[1,2],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[2,8]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertFalse("MultiLineString not in LineString" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[2,8]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertFalse("MultiLineString not in LineString" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[1,1]],[[1,2],[1,1],[1,2],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertFalse("MultiLineString not in LineString" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]],[[1,2],[1,1],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));

    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]],[[2,1],[1,6]]])));
    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]],[[1,1],[1,2]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertFalse("MultiLineString not in MultiLineString", jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertFalse("MultiLineString not in MultiLineString", jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]],[[1,1],[1,3]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertFalse("MultiLineString not in MultiLineString", jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,4]],[[1,1],[1,2]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertFalse("MultiLineString not in MultiLineString", jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,4]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]]])));

    assertTrue("MultiLineString is in Polygon on vertex" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]])));
    assertTrue("MultiLineString is in Polygon inside" ,    jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("MultiLineString intersects in Polygon" ,  jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,3]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("MultiLineString is not in Polygon" ,      jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[-2,-1],[-1,-1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));
    assertFalse("MultiLineString is not in Polygon" ,      jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[-2,-1],[-1,-1]],[[2,1],[1,1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("MultiLineString is in MultiPolygon[0] on vertex " , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiLineString is in MultiPolygon[1] on vertex " , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("MultiLineString is in MultiPolygon[0] inside" ,     jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("MultiLineString is in MultiPolygon[1] inside" ,     jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("MultiLineString not in MultiPolygon " ,            jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[-2,-1],[-1,-1]],[[2,1],[1,1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertFalse("MultiLineString not in MultiPolygon " ,            jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[-2,-1],[-1,-1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("MultiLineString is in GeometryCollection[0]" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("MultiLineString is in GeometryCollection[1]" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("MultiLineString is not in GeometryCollection" , jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testPolygonInGeometry = function () {
    assertFalse("Polygon cannot be in Point", jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,2],[2,1]]]),new jsonOdm.Geo.Point([1,2])));
    assertFalse("Polygon cannot be in MultiPoint", jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,2],[2,1]]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]])));
    assertFalse("Polygon cannot be in LineString", jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,8],[3,1]],[[1,2],[1,1],[1,2],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertFalse("Polygon cannot be in MultiLineString", jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));

    assertTrue("Polygon is in bounds" ,      jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,2],[1,1],[0,2],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("Polygon is not in bounds" , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[0,3],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("Polygon is not in bounds" , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[0,3],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("Polygon is not in bounds" , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[0,3],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,-2,-2])));

    assertTrue("Polygon is in Polygon on vertex", jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]])));
    assertTrue("Polygon is in Polygon inside",    jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,1],[1,1],[0.5,2],[1,0.5],[1,2]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("Polygon intersects in Polygon",  jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,1],[1,1],[0.5,2],[1,0.5],[1,3]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("Polygon is not in Polygon",      jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,1],[1,1],[-2,-1],[-1,-1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));
    assertFalse("Polygon is not in Polygon",      jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[-2,-1],[-1,-1],[2,1],[1,1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("Polygon is in MultiPolygon[0] on vertex " , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("Polygon is in MultiPolygon[1] on vertex " , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[-1,-1],[3,0],[5,5],[1,5],[-1,2]]]])));
    assertTrue("Polygon is in MultiPolygon[0] inside" ,     jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,1],[1,1],[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("Polygon is in MultiPolygon[1] inside" ,     jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,1],[1,1],[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("Polygon not in MultiPolygon " ,            jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[-2,-1],[-1,-1],[2,1],[1,1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertFalse("Polygon not in MultiPolygon " ,            jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[2,1],[1,1],[-2,-1],[-1,-1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("Polygon is in GeometryCollection[0]" , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2],[1,5],[4,2],[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.Polygon([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("Polygon is in GeometryCollection[1]" , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2],[1,5],[4,2],[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.Polygon([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("Polygon is not in GeometryCollection" , jsonOdm.Geo.Polygon.within(new jsonOdm.Geo.Polygon([[[1,1],[1,2],[1,5],[4,2],[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.Polygon([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testMultiPolygonInGeometry = function () {
    assertFalse("MultiPolygon cannot be in Point", jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,2],[2,1]]]]),new jsonOdm.Geo.Point([1,2])));
    assertFalse("MultiPolygon cannot be in MultiPoint", jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,2],[2,1]]]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]])));
    assertFalse("MultiPolygon cannot be in LineString", jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,8],[3,1]]],[[[1,2],[1,1],[1,2],[3,1]]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertFalse("MultiPolygon cannot be in MultiLineString", jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2]]],[[[3,1],[1,5]]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));

    assertTrue("MultiPolygon is in bounds",         jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,2],[1,1],[0,2],[1,1],[2,2],[0,1]]],[[[1,1],[1,2],[2,2],[1,1]]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("MultiPolygon is in bounds",         jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[2,2],[1,1]]],[[[1,2],[1,1],[0,2],[1,1],[2,2],[0,1]]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiPolygon [0] is not in bounds",jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[0,3],[1,1],[2,2],[0,1]]],[[[1,2],[1,1],[0,2],[1,1],[2,2],[0,1]]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiPolygon [1] is not in bounds",jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,2],[1,1],[0,2],[1,1],[2,2],[0,1]]],[[[0,3],[1,1],[2,2],[0,1]]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiPolygon is not in bounds",    jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[0,3],[1,1],[2,2],[0,1]]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiPolygon is not in bounds",    jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[0,3],[1,1],[2,2],[0,1]]]]),new jsonOdm.Geo.BoundaryBox([0,0,-2,-2])));

    assertTrue("MultiPolygon is in Polygon on vertex",          jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[3,1],[1,5]]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]])));
    assertTrue("MultiPolygon is in Polygon on vertex and in",   jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[3,1],[1,5]]],[[[1,2],[2,2],[1,3]]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]])));
    assertTrue("MultiPolygon is in Polygon inside",             jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,1],[1,1],[0.5,2],[1,0.5],[1,2]]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("MultiPolygon only [0] is in Polygon on vertex",jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[3,1],[1,5]]],[[[2,1],[1,1],[-2,-1],[-1,-1]]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]])));
    assertFalse("MultiPolygon intersects in Polygon",           jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,1],[1,1],[0.5,2],[1,0.5],[1,3]]],[[[1,1],[0,1],[0,0],[0.3,0.6]]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("MultiPolygon is not in Polygon",               jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,1],[1,1],[-2,-1],[-1,-1]]],[[[-1,-1],[0,-1],[0,0],[-0.3,-0.6]]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));
    assertFalse("MultiPolygon is not in Polygon",               jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[-2,-1],[-1,-1],[2,1],[1,1]]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("MultiPolygon is in MultiPolygon[0] on vertex " , jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[3,1],[1,5]]],[[[1,2],[2,2],[1,3]]]]), new jsonOdm.Geo.MultiPolygon([[[[-1,-1],[3,0],[5,5],[1,5],[-1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiPolygon is in MultiPolygon[1] on vertex " , jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[3,1],[1,5]]],[[[1,2],[2,2],[1,3]]]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[-1,-1],[3,0],[5,5],[1,5],[-1,2]]]])));
    assertTrue("MultiPolygon is in MultiPolygon[0] inside" ,     jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,1],[1,1],[0.5,2],[1,0.5],[1,2]]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("MultiPolygon is in MultiPolygon[1] inside" ,     jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,1],[1,1],[0.5,2],[1,0.5],[1,2]]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("MultiPolygon not in MultiPolygon ",             jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[3,1],[1,5]]],[[[1,-2],[2,2],[1,3]]]]), new jsonOdm.Geo.MultiPolygon([[[[-1,-1],[3,0],[5,5],[1,5],[-1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertFalse("MultiPolygon not in MultiPolygon " ,            jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[-2,-1],[-1,-1],[2,1],[1,1]]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertFalse("MultiPolygon not in MultiPolygon " ,            jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[2,1],[1,1],[-2,-1],[-1,-1]]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("MultiPolygon is in GeometryCollection[0]" , jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,1],[1,2],[1,5],[4,2],[2,1],[3,1],[1,5]]],[[[1,2],[2,2],[1,3]]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.MultiPolygon([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("MultiPolygon is in GeometryCollection[1]" , jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[1,2],[2,2],[1,3]]],[[[1,1],[1,2],[1,5],[4,2],[2,1],[3,1],[1,5]]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.MultiPolygon([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("MultiPolygon is not in GeometryCollection" , jsonOdm.Geo.MultiPolygon.within(new jsonOdm.Geo.MultiPolygon([[[[-1,-2],[-2,-2],[-2,-1]]],[[[1,1],[1,2],[1,5],[4,2],[2,1],[3,1],[1,5]]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.MultiPolygon([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testGeometryCollectionInGeometry = function () {
    // there are a lot of geometry specific tests, so only simple tests are needed
    assertTrue("Collection in MultiPoint",jsonOdm.Geo.GeometryCollection.within(
        new jsonOdm.Geo.GeometryCollection([
            new jsonOdm.Geo.Point([1,1]),
            new jsonOdm.Geo.Point([2,2]),
            new jsonOdm.Geo.MultiPoint([[2,2],[3,3]])
        ]),
        new jsonOdm.Geo.MultiPoint([[1,1],[2,2],[3,3]])
    ));

    assertTrue("Collection in MultiPoint",jsonOdm.Geo.GeometryCollection.within(
        new jsonOdm.Geo.GeometryCollection([
            new jsonOdm.Geo.Point([1,1]),
            new jsonOdm.Geo.Point([2,2]),
            new jsonOdm.Geo.MultiPoint([[2,2],[3,3]])
        ]),
        new jsonOdm.Geo.MultiPoint([[1,1],[2,2],[3,3],[4,4]])
    ));

    assertFalse("Collection not in MultiPoint",jsonOdm.Geo.GeometryCollection.within(
        new jsonOdm.Geo.GeometryCollection([
            new jsonOdm.Geo.Point([1,1]),
            new jsonOdm.Geo.Point([2,2]),
            new jsonOdm.Geo.MultiPoint([[2,2],[3,3]])
        ]),
        new jsonOdm.Geo.MultiPoint([[1,1],[2,2],[4,4]])
    ));
};

/** Geo intersects **/

GeoTest.prototype.testPointIntersectsGeometry = function () {
    assertEquals("Is an alias",jsonOdm.Geo.Point.intersects,jsonOdm.Geo.Point.within);
};

GeoTest.prototype.testMultiPointIntersectsGeometry = function () {
    assertTrue("MultiPoint intersects Point", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,2],[4,-2],[1,2]]),new jsonOdm.Geo.Point([1,2])));
    assertFalse("MultiPoint does not intersect Point", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,2],[2,1]]),new jsonOdm.Geo.Point([1,2])));

    assertTrue("MultiPoint intersects bounds", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,2],[3,1]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("MultiPoint intersects bounds", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[3,4],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("MultiPoint intersects bounds", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiPoint does not intersect bounds", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[-1,0],[3,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));

    assertTrue("MultiPoint intersects MultiPoint", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([[1,1],[1,2]])));
    assertTrue("MultiPoint intersects MultiPoint", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[8,1],[1,2]]),new jsonOdm.Geo.MultiPoint([[1,1],[1,2]])));
    assertTrue("MultiPoint intersects MultiPoint", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,5]]),new jsonOdm.Geo.MultiPoint([[1,1],[1,2]])));
    assertFalse("MultiPoint does not intersect MultiPoint", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[4,4],[3,3]]),new jsonOdm.Geo.MultiPoint([[2,1],[1,2]])));
    assertFalse("MultiPoint does not intersect MultiPoint", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([1,1])));

    assertTrue("MultiPoint intersects LineString", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,3]]),new jsonOdm.Geo.LineString([[1,1],[1,2]])));
    assertTrue("MultiPoint intersects LineString", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[3,1],[1,2]]),new jsonOdm.Geo.LineString([[1,1],[1,2]])));
    assertFalse("MultiPoint does not intersect LineString", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[2,2]]),new jsonOdm.Geo.LineString([[2,1],[1,2]])));
    assertFalse("MultiPoint does not intersect LineString", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([1,1])));

    assertTrue("MultiPoint intersects MultiLineString first",   jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiPoint intersects MultiLineString first",   jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[2,2]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiPoint intersects MultiLineString second",  jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[2,2],[1,3]],[[1,2],[1,1]]])));
    assertTrue("MultiPoint intersects MultiLineString second",  jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[2,2],[1,3]],[[1,2],[1,1]]])));
    assertTrue("MultiPoint intersects MultiLineString both",    jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[2,2],[1,1]]])));
    assertFalse("MultiPoint does not intersect MultiLineString",jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[2,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[3,1],[1,5]]])));
    assertFalse("MultiPoint does not intersect MultiLineString",jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]])));

    assertTrue("MultiPoint intersects Polygon on vertex", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,1],[1,2]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]])));
    assertTrue("MultiPoint intersects Polygon on vertex", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[8,8]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]])));
    assertTrue("MultiPoint intersects Polygon on path",   jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[0,2],[0,0]]])));
    assertTrue("MultiPoint intersects Polygon on path",   jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[0,1],[2,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[0,2],[0,0]]])));
    assertTrue("MultiPoint intersects Polygon inside",    jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[8,8],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("MultiPoint does not intersect Polygon",  jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("MultiPoint intersects MultiPolygon[0] on vertex ", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[-1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[0] on vertex ", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[-1,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[1] on vertex ", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[0] on path",    jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[0,1],[6,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[0,2],[0,0]]],[[[0,0],[-2,0],[0,-2],[0,0]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[0] on path",    jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[6,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[0,2],[0,0]]],[[[0,0],[-2,0],[0,-2],[0,0]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[1] on path",    jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[0,-2],[0,0]]],[[[0,0],[2,0],[0,2],[0,0]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[0] inside",     jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,1],[6,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[0] inside",     jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[6,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[1] inside",     jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[2,1],[1,8]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertTrue("MultiPoint intersects MultiPolygon[1] inside",     jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[5,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("MultiPoint does not intersect MultiPolygon",      jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[0,0],[1,-1]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("MultiPoint is in GeometryCollection[0]", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[1,1],[5,2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]]),
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("MultiPoint is in GeometryCollection[1]", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[3,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("MultiPoint is not in GeometryCollection", jsonOdm.Geo.MultiPoint.intersects(new jsonOdm.Geo.MultiPoint([[-1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testLineStringIntersectsGeometry = function () {
    assertTrue("LineString intersects Point", jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,2],[2,1]]),new jsonOdm.Geo.Point([1,2])));
    assertTrue("LineString intersects MultiPoint",jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,2],[2,1]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]])));

    assertTrue("LineString intersects bounds",          jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,2],[1,1]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("LineString intersects just in bounds",  jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[0,0],[-2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("LineString does not intersects bounds",jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[-1,0],[2,-2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));

    assertTrue("LineString intersects LineString" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[3,1],[1,3]]),new jsonOdm.Geo.LineString([[1,1],[3,3]])));
    assertTrue("LineString intersects LineString" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[3,1],[1,3]]),new jsonOdm.Geo.LineString([[1,3],[3,1]])));
    assertTrue("LineString intersects LineString" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[-2,-2],[-2,-4],[0,0],[3,1],[1,3]]),new jsonOdm.Geo.LineString([[1,3],[3,1]])));
    assertTrue("LineString is not in LineString only Points", jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,2],[2,2],[1,1]])));
    assertFalse("LineString not intersect LineString" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[2,2],[-2,2],[-2,6]]),new jsonOdm.Geo.LineString([[1,1],[1,-3],[6,-3],[6,6]])));
    assertFalse("LineString not intersect LineString" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([1,1])));

    assertTrue("LineString intersects MultiLineString first" ,  jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[0,2],[2,2]]),new jsonOdm.Geo.MultiLineString([[[1,-1],[1,4]],[[3,1],[5,5]]])));
    assertTrue("LineString intersects MultiLineString second" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[0,2],[2,2]]),new jsonOdm.Geo.MultiLineString([[[3,1],[5,5]],[[1,-1],[1,3]]])));
    assertFalse("LineString is not in MultiLineString" ,   jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[3,1],[5,5]],[[-3,1],[-1,5]]])));
    assertFalse("LineString is not in MultiLineString" ,   jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[1,2],[1,3]])));

    assertTrue("LineString is in Polygon on vertex" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[3,1],[1,2]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]])));
    assertTrue("LineString is in Polygon inside" ,    jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertTrue("LineString intersects in Polygon" ,  jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[4,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertFalse("LineString is not in Polygon" ,      jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("LineString is in MultiPolygon[0] on vertex " , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[3,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("LineString is in MultiPolygon[1] on vertex " , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[3,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("LineString is in MultiPolygon[0] inside" ,     jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("LineString is in MultiPolygon[1] inside" ,     jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertTrue("LineString intersects MultiPolygon[0]" ,       jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[2,-1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("LineString intersects MultiPolygon[1]" ,       jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[4,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertFalse("LineString not in MultiPolygon" ,             jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[0,0],[1,-1]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("LineString is in GeometryCollection[0]" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[-1,1],[1,2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[3,1],[1,1]]]),
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("LineString is in GeometryCollection[1]" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[10,10],[13,2],[1,1],[-2,2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertFalse("LineString is not in GeometryCollection" , jsonOdm.Geo.LineString.intersects(new jsonOdm.Geo.LineString([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.LineString([[2,1],[1,2]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
};

GeoTest.prototype.testMultiLineStringIntersectsGeometry = function () {
    assertTrue("MultiLineString cannot be in Point", jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,2],[2,1]]]),new jsonOdm.Geo.Point([1,2])));
    assertTrue("MultiLineString cannot be in MultiPoint", jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,2],[2,1]]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]])));

    assertTrue("MultiLineString is in bounds" ,      jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[0,2],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("MultiLineString intersects bounds" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[0,3],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertTrue("MultiLineString intersects bounds" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[0,3],[1,1],[2,2],[0,1]],[[1,2],[1,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2])));
    assertFalse("MultiLineString is not in bounds" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[0,3],[1,1],[2,2],[1,2]],[[1,2],[1,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,-2,-2])));

    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]],[[1,2],[1,1],[1,2],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString is in LineString" ,   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[3,1],[2,8]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString intersects LineString",jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[2,8]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertTrue("MultiLineString intersects LineString",jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[20,8],[15,10]],[[0,3],[1,3],[5,1],[1,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]])));
    assertFalse("MultiLineString not in LineString" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]],[[1,2],[1,1],[3,1]]]),new jsonOdm.Geo.LineString([[10,10],[10,20],[20,11],[12,28]])));

    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[0,1.5],[1.5,1.5]],[[13,11],[1,15]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[11,11],[11,12]],[[3,5],[1,1]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]],[[2,1],[1,6]]])));
    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]],[[1,1],[1,2]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertTrue("MultiLineString is in MultiLineString",   jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertFalse("MultiLineString not in MultiLineString", jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[13,1],[11,4]],[[11,11],[11,12]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]])));
    assertFalse("MultiLineString not in MultiLineString", jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,4]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]]])));

    assertTrue("MultiLineString is in Polygon on vertex" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]])));
    assertTrue("MultiLineString is in Polygon inside" ,    jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertTrue("MultiLineString intersects Polygon" ,      jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,3]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]])));
    assertTrue("MultiLineString intersects Polygon" ,      jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[-2,-1],[-1,-1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));
    assertFalse("MultiLineString is not in Polygon" ,      jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[9,2],[3,3]],[[2,1],[1,1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]])));

    assertTrue("MultiLineString is in MultiPolygon[0] on vertex " , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiLineString is in MultiPolygon[1] on vertex " , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]])));
    assertTrue("MultiLineString is in MultiPolygon[0] inside" ,     jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]])));
    assertTrue("MultiLineString is in MultiPolygon[1] inside" ,     jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]])));
    assertTrue("MultiLineString intersects MultiPolygon[1] " ,      jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[-2,-1],[-1,-1]],[[1,1],[3,2]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertTrue("MultiLineString intersects MultiPolygon[0]" ,       jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[3,3]],[[-2,-1],[-1,-1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));
    assertFalse("MultiLineString not in MultiPolygon " ,            jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[-1,-1],[-3,-3]],[[-2,-1],[-1,-1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]])));

    assertTrue("MultiLineString is in GeometryCollection[0]" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("MultiLineString is in GeometryCollection[1]" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
        new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
    ])));
    assertTrue("MultiLineString intersects GeometryCollection[1]" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
        new jsonOdm.Geo.MultiLineString([[[0,5],[3,0]],[[3,1],[1,5]]])
    ])));
    assertFalse("MultiLineString not in GeometryCollection" , jsonOdm.Geo.MultiLineString.intersects(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
        new jsonOdm.Geo.MultiLineString([[[0,-5],[-3,0]],[[-3,-1],[-1,-5]]])
    ])));
};