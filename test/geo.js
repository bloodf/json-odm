describe("Geo Tools", function () {
    describe("Point in Polygon", function () {
        var point = [10,10];
        var polygon1 = [[0,0],[0,20],[20,20],[20,0],[0,0]];
        var polygon2 = [[0,0],[20,0],[9,10],[20,20],[0,20],[0,0]];
        var polygon3 = [[0,0],[20,0],[9,10],[20,20],[9,0],[0,0]];
        var polygon4 = [[0,0],[20,0],[9,10],[20,20],[21,0],[22,20],[23,0],[24,20],[25,0],[0,0]];
        var polygon5 = [[0,0],[20,0],[0,20],[0,0]];
        var polygon6 = [[10,20],[30,10],[10,10],[10,50],[10,20]];

        it("Should be in Square", function () {
            expect(jsonOdm.Geo.pointWithinPolygon(point,polygon1)).toBeTruthy();
        });
        it("Should be in Square", function () {
            expect(jsonOdm.Geo.pointWithinPolygon(point,polygon3)).toBeTruthy();
        });
        it("Should be in Square", function () {
            expect(jsonOdm.Geo.pointWithinPolygon(point,polygon4)).toBeTruthy();
        });
        it("Should be on Path", function () {
            expect(jsonOdm.Geo.pointWithinPolygon(point,polygon5)).toBeTruthy();
        });
        it("Should be on Vertex", function () {
            expect(jsonOdm.Geo.pointWithinPolygon(point,polygon6)).toBeTruthy();
        });
        it("Should be on Vertex", function () {
            expect(jsonOdm.Geo.pointWithinPolygon([1,1], [[1,2],[3,1],[1,1],[1,5],[1,2]])).toBeTruthy();
        });
        it("Should not be in Square", function () {
            expect(jsonOdm.Geo.pointWithinPolygon(point,polygon2)).toBeFalsy();
        });
    });
    describe("Edge Intersects Edge", function () {
        it("Should intersect", function () {
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,9] ],[[10,0] ,[0,9]])).toBeTruthy();
           expect(jsonOdm.Geo.edgeIntersectsEdge([[10,0],[0,10] ],[[0,0]  ,[10,10]])).toBeTruthy();
        });
        it("Should intersect in vertex", function () {
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[0,0]  ,[11,10]])).toBeTruthy();
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[1,0]  ,[10,10]])).toBeTruthy();
        });
        it("Should be within each other", function () {
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[1,1]  ,[9,9]])).toBeTruthy();
           expect(jsonOdm.Geo.edgeIntersectsEdge([[1,1], [9,9]],  [[0,0]  ,[10,10]])).toBeTruthy();
        });
        it("Should be parallel", function () {
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[1,0]  ,[11,10]])).toBeFalsy();
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[-1,0] ,[-11,-10]])).toBeFalsy();
        });
        it("Should be out of bounds", function () {
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[-10,0],[-1,-10]])).toBeFalsy();
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,0], [10,10]],[[2,0]  ,[11,10]])).toBeFalsy();
           expect(jsonOdm.Geo.edgeIntersectsEdge([[0,1], [0,3]]  ,[[0,10] ,[10,10]])).toBeFalsy();
        });
    });
    describe("Intersect Bounds", function () {
        it("Should intersect", function () {
           expect(jsonOdm.Geo.edgeIntersectsBounds([[-1,0],[3,0]],[0,0,2,2])).toBeTruthy();
           expect(jsonOdm.Geo.edgeIntersectsBounds([[1,1],[1.5,1.5]],[0,0,2,2])).toBeTruthy();
           expect(jsonOdm.Geo.edgeIntersectsBounds([[1,1],[8,1.5]],[0,0,2,2])).toBeTruthy();
        });
        it("Should not intersect", function () {
            expect(jsonOdm.Geo.edgeIntersectsBounds([[-1,0],[3,-1]],[0,0,2,2])).toBeFalsy();
        });
    });
    describe("Edge within polygon", function () {
        it("Should be inside", function () {
            expect(jsonOdm.Geo.edgeWithinPolygon([[1,1],[3,3]],[[0,0],[0,10],[10,10],[10,0]])).toBeTruthy();
            expect(jsonOdm.Geo.edgeWithinPolygon([[0,1],[0,3]],[[0,0],[0,10],[10,10],[10,0]])).toBeTruthy();
        });
        it("Should be outside", function () {
            expect(jsonOdm.Geo.edgeWithinPolygon([[10,1],[10,11]],[[0,0],[0,10],[10,10],[10,0]])).toBeFalsy();
            expect(jsonOdm.Geo.edgeWithinPolygon([[2,5],[10,6]],[[0,0],[10,0],[10,10],[6,10],[6,4],[5,10],[0,10]])).toBeFalsy();
        });
    });
    describe("Point on LineString", function () {
        var point = [10,10];
        var line1 = [[0,0],[0,10],[10,10],[10,0]];
        var line2 = [[0,0],[0,20],[10,20],[10,19]];
        var line3 = [[0,0],[20,0],[0,20]];
        var line4 = [[0,0],[20,0],[20,20],[0,20]];

        it("Should be on it", function () {
            expect(jsonOdm.Geo.pointWithinLineString([1,1],[[3,1],[1,1]])).toBeTruthy();
            expect(jsonOdm.Geo.pointWithinLineString(point,line1)).toBeTruthy();
            expect(jsonOdm.Geo.pointWithinLineString(point,line3)).toBeTruthy();
        });
        it("Should not be on it", function () {
            expect(jsonOdm.Geo.pointWithinLineString(point,line2)).toBeFalsy();
            expect(jsonOdm.Geo.pointWithinLineString(point,line4)).toBeFalsy();
        });
    });
    describe("Detect Geometry", function () {
        it("should find the right one", function () {
            expect(jsonOdm.Geo.detectAsGeometry([1,1]) instanceof jsonOdm.Geo.Point).toBeTruthy()
            expect(jsonOdm.Geo.detectAsGeometry([1,1,3,3]) instanceof Array).toBeTruthy()// is an Array because constructor returns an array
            expect(jsonOdm.Geo.detectAsGeometry([[1,1]]) instanceof jsonOdm.Geo.LineString).toBeTruthy()
            expect(jsonOdm.Geo.detectAsGeometry([[[1,1]]]) instanceof jsonOdm.Geo.Polygon).toBeTruthy()
            expect(jsonOdm.Geo.detectAsGeometry([[[[1,1]]]]) instanceof jsonOdm.Geo.MultiPolygon).toBeTruthy()
        });
    });
    describe("Point in Geometry", function () {
        it("Should be in Point", function () {
           expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Point([1,1]))).toBeTruthy();
        });
        it("Should not be in Point", function () {
           expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Point([1,2]))).toBeFalsy();
        });
        it("Should be in bounds", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.BoundaryBox([0,0,1,1]))).toBeTruthy();
        });
        it("Should not be in bounds", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.BoundaryBox([2,2,8,8]))).toBeFalsy();
        });
        it("Should be in LineString", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.LineString([[1,1],[1,2]]))).toBeTruthy();
        });
        it("Should not be in LineString", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.LineString([[2,1],[1,2]]))).toBeFalsy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.LineString([1,1]))).toBeFalsy();
        });
        it("Should be in MultiLineString", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]]))).toBeTruthy();
        });
        it("Should not be in MultiLineString", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]]))).toBeFalsy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]]))).toBeFalsy();
        });
        it("Should be in Polygon", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[0,2],[0,0]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]]))).toBeTruthy();
        });
        it("Should not be in Polygon", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]))).toBeFalsy();
        });
        it("Should be in MultiPolygon on vertex, on path, inside", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[0,2],[0,0]]],[[[0,0],[-2,0],[0,-2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[0,-2],[0,0]]],[[[0,0],[2,0],[0,2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]]))).toBeTruthy();
        });
        it("Should not be in MultiPolygon", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([-1,1]),new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeFalsy();
        });
        it("Point is in GeometryCollection[0]", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.GeometryCollection([
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]]),
                new jsonOdm.Geo.LineString([[2,1],[1,2]]),
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
            ]))).toBeTruthy();
        });
        it("Point is in GeometryCollection[1]", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.GeometryCollection([
                new jsonOdm.Geo.LineString([[2,1],[1,2]]),
                new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
            ]))).toBeTruthy();
        });
        it("Point is in GeometryCollection[1]", function () {
            expect(jsonOdm.Geo.Point.within(new jsonOdm.Geo.Point([1,1]), new jsonOdm.Geo.GeometryCollection([
                new jsonOdm.Geo.LineString([[2,1],[1,2]]),
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
            ]))).toBeFalsy();
        });
    });
    describe("MultiPoint in Geometry", function () {
        it("Should be in Point as edge case", function () {
           expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,2]]),new jsonOdm.Geo.Point([1,2]))).toBeTruthy();
        });
        it("Should not be in Point", function () {
           expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,2],[2,1]]),new jsonOdm.Geo.Point([1,2]))).toBeFalsy();
        });
        it("Should be is in bounds", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,2],[1,1]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeTruthy();
        });
        it("Should not be in bounds", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[-1,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeFalsy();
        });
        it("Should be in MultiPoint", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]))).toBeTruthy();
        });
        it("Should not be in MultiPoint", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([[2,1],[1,2]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiPoint([1,1]))).toBeFalsy();
        });
        it("Should be in LineString", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,1],[1,2]]))).toBeTruthy();
        });
        it("Should not be in LineString", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[2,1],[1,2]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.LineString([1,1]))).toBeFalsy();
        });
        it("Should be in MultiLineString (first,middle,last)", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[2,2],[1,3]],[[1,2],[1,1]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[2,2],[1,1]]]))).toBeTruthy();
        });
        it("Should not be in MultiLineString", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[3,1],[1,5]]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]]))).toBeFalsy();
        });
        it("Should be in Polygon (vertex,path,inside)", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[0,2],[0,0]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]]))).toBeTruthy();
        });
        it("Should not be in Polygon", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]))).toBeFalsy();
        });
        it("Should be in MultiPolygon (vertex,path,inside)", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[0,2],[0,0]]],[[[0,0],[-2,0],[0,-2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[0,-2],[0,0]]],[[[0,0],[2,0],[0,2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]]))).toBeTruthy();
        });
        it("Should not be in MultiPolygon", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[0,0],[1,-1]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeFalsy();
        });
        it("Should be in GeometryCollection[0]", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[1,2]]), new jsonOdm.Geo.GeometryCollection([
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,1]]]),
                new jsonOdm.Geo.LineString([[2,1],[1,2]]),
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
            ]))).toBeTruthy();
        });
        it("Should be in GeometryCollection[1]", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
                new jsonOdm.Geo.LineString([[2,1],[1,2]]),
                new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
            ]))).toBeTruthy();
        });
        it("Should not be in GeometryCollection", function () {
            expect(jsonOdm.Geo.MultiPoint.within(new jsonOdm.Geo.MultiPoint([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
                new jsonOdm.Geo.LineString([[2,1],[1,2]]),
                new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
            ]))).toBeFalsy();
        });
    });
    describe("LineString in Geometry", function () {
        it("Cannot be in Point or MultiPoint", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,2],[2,1]]),new jsonOdm.Geo.Point([1,2]))).toBeFalsy();
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,2],[2,1]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]]))).toBeFalsy();
        });
        it("Should be in bounds", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,2],[1,1]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeTruthy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[0,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeTruthy();
        });
        it("Should not be in bounds", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[-1,0],[2,2]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeFalsy();
        });
        it("Should be in LineString", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,1],[1,2]]))).toBeTruthy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,2],[1,1]]))).toBeTruthy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2],[1,1]]),new jsonOdm.Geo.LineString([[1,2],[1,1]]))).toBeTruthy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[2,1],[1,2],[1,1]]))).toBeTruthy();
        });
        it("Should not be in LineString", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([[1,2],[2,2],[1,1]]))).toBeFalsy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.LineString([1,1]))).toBeFalsy();
        });
        it("Should be in MultiLineString(first,second)", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeTruthy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[2,2],[1,3]],[[1,2],[1,1]]]))).toBeTruthy();
        });
        it("Should not be in MultiLineString", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[2,2],[1,1]]]))).toBeFalsy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[[1,2],[1,3]],[[3,1],[1,5]]]))).toBeFalsy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]),new jsonOdm.Geo.MultiLineString([[1,1],[1,2]]))).toBeFalsy();
        });
        it("Should be in Polygon(vertex,inside)", function () {
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[3,1],[1,2]]),new jsonOdm.Geo.Polygon([[[1,2],[3,1],[1,1],[1,5],[1,2]]]))).toBeTruthy();
            expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]]))).toBeTruthy();
        });
        it("Should not be in Polygon", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[4,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]]))).toBeFalsy();
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]))).toBeFalsy();
        });
        it("Should be in MultiPolygon (vertex, inside)", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[3,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeTruthy();
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[3,1],[1,2]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]]))).toBeTruthy();
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]))).toBeTruthy();
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[2,1],[1,1]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]]))).toBeTruthy();
        });
        it("Should not be in MultiPolygon", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[0,0],[1,-1]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeFalsy();
        });
        it("Should be in GeometryCollection[0]", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[1,2]]), new jsonOdm.Geo.GeometryCollection([
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[3,1],[1,1]]]),
               new jsonOdm.Geo.LineString([[2,1],[1,2]]),
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
           ]))).toBeTruthy();
        });
        it("Should be in GeometryCollection[1]", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[2,2]]), new jsonOdm.Geo.GeometryCollection([
               new jsonOdm.Geo.LineString([[2,1],[1,2]]),
               new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]),
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
           ]))).toBeTruthy();
        });
        it("Should not be in GeometryCollection", function () {
           expect(jsonOdm.Geo.LineString.within(new jsonOdm.Geo.LineString([[1,1],[0,-2]]), new jsonOdm.Geo.GeometryCollection([
               new jsonOdm.Geo.LineString([[2,1],[1,2]]),
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
           ]))).toBeFalsy();
        });
    });
    describe("MultiLineString in Geometry", function () {
        it("Cannot not be in Point or MultiPoint", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[2,1]]]),new jsonOdm.Geo.Point([1,2]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[2,1]]]),new jsonOdm.Geo.MultiPoint([[1,2],[2,1]]))).toBeFalsy();
        });
        it("Should be in bounds", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[0,2],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeTruthy();
        });
        it("Should not be in bounds", function () {
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,2],[1,1]],[[0,3],[1,1],[2,2],[0,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeFalsy();
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[0,3],[1,1],[2,2],[0,1]],[[1,2],[1,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,2,2]))).toBeFalsy();
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[0,3],[1,1],[2,2],[0,1]],[[1,2],[1,1]]]),new jsonOdm.Geo.BoundaryBox([0,0,-2,-2]))).toBeFalsy();
        });
        it("Should be in LineString", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]],[[1,2],[1,1],[1,2],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[2,8]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeTruthy();
        });
        it("Should not be in LineString", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[2,8]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[1,1]],[[1,2],[1,1],[1,2],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,8],[3,1]],[[1,2],[1,1],[3,1]]]),new jsonOdm.Geo.LineString([[1,1],[1,2],[3,1],[2,8]]))).toBeFalsy();
        });
        it("Should be in MultiLineString", function () {
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeTruthy();
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]],[[2,1],[1,6]]]))).toBeTruthy();
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]],[[1,1],[1,2]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeTruthy();
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeTruthy();
        });
        it("Should not be in MultiLineString", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[3,1],[1,5]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,5]],[[1,1],[1,3]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[3,1],[1,4]],[[1,1],[1,2]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,4]]]),new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]]]))).toBeFalsy();
        });
        it("Should be in Polygon (vertex,inside)", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]),new jsonOdm.Geo.Polygon([[[1,1],[1,2],[3,1],[1,5]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]]))).toBeTruthy();
        });
        it("Should not be in Polygon (vertex,inside)", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,3]]]),new jsonOdm.Geo.Polygon([[[0,0],[2,0],[2,2],[0,2],[0,0]]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[-2,-1],[-1,-1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]))).toBeFalsy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[-2,-1],[-1,-1]],[[2,1],[1,1]]]),new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]))).toBeFalsy();
        });
        it("Should be in MultiPolygon (vertex,inside)", function () {
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2]],[[3,1],[1,5]]]), new jsonOdm.Geo.MultiPolygon([[[[10,20],[30,10],[10,10],[10,50],[10,20]]],[[[1,2],[3,1],[1,1],[1,5],[1,2]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[2,0],[2,2],[0,2],[0,0]]],[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]]))).toBeTruthy();
            expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[0.5,2],[1,0.5],[1,2]]]), new jsonOdm.Geo.MultiPolygon([[[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]],[[[0,0],[2,0],[2,2],[0,2],[0,0]]]]))).toBeTruthy();
        });
        it("Should not be in MultiPolygon", function () {
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[-2,-1],[-1,-1]],[[2,1],[1,1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeFalsy();
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[2,1],[1,1]],[[-2,-1],[-1,-1]]]), new jsonOdm.Geo.MultiPolygon([[[[1,2],[3,1],[1,1],[1,5],[1,2]]],[[[10,20],[30,10],[10,10],[10,50],[10,20]]]]))).toBeFalsy();
        });
        it("Should be in GeometryCollection[0]", function () {
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
               new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
               new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
           ]))).toBeTruthy();
        });
        it("Should be in GeometryCollection[1]", function () {
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
               new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
               new jsonOdm.Geo.BoundaryBox([0,0,8,8]),
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
           ]))).toBeTruthy();
        });
        it("Should not be in GeometryCollection", function () {
           expect(jsonOdm.Geo.MultiLineString.within(new jsonOdm.Geo.MultiLineString([[[1,1],[1,2],[1,5],[4,2]],[[2,1],[3,1],[1,5]]]), new jsonOdm.Geo.GeometryCollection([
               new jsonOdm.Geo.Polygon([[[0,0],[-2,0],[-2,-2],[0,-2],[0,0]]]),
               new jsonOdm.Geo.MultiLineString([[[1,2],[1,2]],[[3,1],[1,5]]])
           ]))).toBeFalsy();
        });
    })
});