var myPath = new Path();
// myPath.fullySelected = true;
var leftEndpoint = new Point(100,500);
var rightEndpoint = new Point(500, 500);

myPath.strokeColor = 'black';
myPath.add(leftEndpoint);
var numPoints = randInt(0,4);
// console.log(numPoints);
myPath.add(rightEndpoint);
addPoints(myPath, numPoints);

myPath.smooth();


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

genArrow(leftEndpoint, 15, 180, 10)
genArrow(rightEndpoint, 15, 0, 10)

// Draws an arrow path of a certain size and offset from a line endpoint. 
function genArrow(endpoint, size, rotation, offset) {
    var arrow = new Path([new Point(0,0), new Point(size/2, size/2), new Point(0, size)]);
    arrow.rotation = rotation;  
    arrow.position = endpoint;
    arrow.strokeColor = 'black';

    // var dir = isLeft ? 1 : -1;

    // leftArrow.add(new Point(endpoint.x+(size-offset)*dir, endpoint.y-size));
    // leftArrow.add(new Point(endpoint.x-(offset*dir), endpoint.y));
    // leftArrow.add(new Point(endpoint.x+(size-offset)*dir, endpoint.y+size));

}

function randInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max-min) + min)
}