console.log(view.center);

var axes = genAxes(project.view.center, 750);

project.view.onClick = function() {
    console.log('click');
    console.log(axes.children);

    // Move the middle points in the axes
    for (var j = 0; j < 2; j++) {
        var origPath = axes.children[j];
        var numPoints = origPath.segments.length;
        var newPath = new Path([origPath.segments[0].point, origPath.segments[numPoints-1].point]);
        addPoints(newPath, numPoints-2, 10);
        var tween = {};
        for (var i = 1; i < numPoints-1; i++) {
            var tweenString = 'segments[' + i.toString() + '].point';
            tween[tweenString] = newPath.segments[i].point;
        }
        origPath.tweenTo(tween, 100);
    }
}

project.view.onResize = function() {
    axes.position = project.view.center;
}

function genAxes(centerPoint, size) {
    var offset=size/2;

    var leftEndpoint = new Point(centerPoint.x-offset,centerPoint.y);
    var rightEndpoint = new Point(centerPoint.x+offset, centerPoint.y);
    var topEndpoint = new Point(centerPoint.x, centerPoint.y-offset);
    var bottomEndpoint = new Point(centerPoint.x, centerPoint.y+offset);

    var horizPath = new Path({segments: [leftEndpoint, rightEndpoint], strokeColor: 'black', strokeWidth: 6, strokeCap: 'round'});
    horizPath.fullySelected = true;
    var vertPath = new Path({segments: [topEndpoint, bottomEndpoint], strokeColor: 'black', strokeWidth: 6, strokeCap: 'round'});

    horizPath.strokeColor = 'black';
    vertPath.strokeColor = 'black';


    addPoints(horizPath, randInt(0,4), 10);
    addPoints(vertPath, randInt(0,4), 10);

    horizPath.smooth();
    vertPath.smooth();

    return new Group([horizPath, vertPath, genArrow(leftEndpoint, 15, 180), genArrow(rightEndpoint, 15, 0), genArrow(topEndpoint, 15, 270), genArrow(bottomEndpoint, 15, 90)]);
}

// Adds up to numPoints randomly-generated points to the path
function addPoints(path, numPoints, limit) {
    var len = path.length;
    var allSegments = [];
    for (var i = 0; i < numPoints; i++) {
        var pos = path.getPointAt((len/(numPoints+1))*(i+1));
        pos.x += randInt(-limit, limit);
        pos.y += randInt(-limit, limit);
        allSegments.push(pos);
    }
    path.insertSegments(1, allSegments);
}

// Draws an arrow path of a certain size and offset from a line endpoint. 
function genArrow(endpoint, size, rotation) {
    var arrow = new Path({segments: [new Point(0,0), new Point(size/2, size/2), new Point(0, size)], strokeColor: 'black', strokeWidth: 6, strokeCap: 'round', strokeJoin: 'round'});
    arrow.rotation = rotation;  
    arrow.position = endpoint;
    arrow.strokeColor = 'black';
    return arrow
}

function randInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max-min) + min)
}