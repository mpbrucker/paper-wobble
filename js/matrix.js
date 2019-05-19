var leftEndpoint = new Point(100,500);
var rightEndpoint = new Point(500, 500);
var topEndpoint = new Point(300, 300);
var bottomEndpoint = new Point(300, 700);

var horizPath = new Path({segments: [leftEndpoint, rightEndpoint], strokeColor: 'black', strokeWidth: 6, strokeCap: 'round'});
var vertPath = new Path({segments: [topEndpoint, bottomEndpoint], strokeColor: 'black', strokeWidth: 6, strokeCap: 'round'});

horizPath.strokeColor = 'black';
vertPath.strokeColor = 'black';


var numPoints = randInt(0,4);
addPoints(horizPath, numPoints, 10);
addPoints(vertPath, numPoints, 10);

horizPath.smooth();
vertPath.smooth();

genArrow(leftEndpoint, 15, 180);
genArrow(rightEndpoint, 15, 0);

genArrow(topEndpoint, 15, 270);
genArrow(bottomEndpoint, 15, 90);



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
    var arrow = new Path([new Point(0,0), new Point(size/2, size/2), new Point(0, size)]);
    arrow.rotation = rotation;  
    arrow.position = endpoint;
    arrow.strokeColor = 'black';
}

function randInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max-min) + min)
}