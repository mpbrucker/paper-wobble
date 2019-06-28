
var axes = genAxes(project.view.center, 750);

var points = {'design': [{x: 50, y: 50}, {x: -20, y: 30}], 'computing': [{x: -100, y: 250}, {x: 200, y: 30}]};
// Default keyword to use
var orig = 'design';
var pointPaths = [];

// for (var k = 0; k < points[orig].length; k++) {
//     pointPaths.push(new Path.Circle({center: new Point(points[orig][k].x, -points[orig][k].y)+axes.bounds.center, radius: 40, strokeColor: 'black', strokeWidth: 3}))
// }

allPoppers = [];

var newCirc = genCircleWithPopper(new Point(points[orig][0].x, -points[orig][0].y)+axes.bounds.center);
console.log(newCirc);
pointPaths.push(newCirc);

console.log(pointPaths[0])


function genCircleWithPopper(origin) {
    var circ = new Path.Circle({
        center: origin,
        radius: 40, // TODO make this programmatic
        strokeColor: 'black',
        strokeWidth: 3,
    });
    var pop = new Popper(function() { return circ.bounds; }, document.getElementById('pop'), {
    })
    allPoppers.push(pop);
    return circ;
}



document.getElementById('computing').onclick = function() {tweenCircles('computing')};
document.getElementById('design').onclick = function() {tweenCircles('design')};


var leftVar = 200;
var topVar = 50;


// var testPosition = { getBoundingClientRect: function() { return { width: 40, height: 40, left: leftVar, top: topVar, bottom: topVar, right: leftVar }} }

// var pop = new Popper(testPosition, document.getElementById('pop'), { 
//     placement: 'bottom',
//     // onUpdate: function(data) {
//     //     console.log(data.offsets.popper);
//     // },
// });




// console.log(pointPaths[0].bounds)

function tweenCircles(keyword) {
    for (var i=0;i<allPoppers.length; i++) {
        allPoppers[i].update;    
    }

    var tween = {};
    for (var i=0;i<pointPaths.length;i++) {
        console.log(pointPaths[i].position);
        pointPaths[i].tweenTo({
            'position.x': points[keyword][i].x+axes.bounds.center.x, 
            'position.y': points[keyword][i].y+axes.bounds.center.y}, 
            300, 
            { easing: 'easeInOutQuartic' }
        ).onUpdate = function(event) {};
    }
}

project.view.onClick = function() {

    // Move the middle points in the axes
    for (var j = 0; j < 2; j++) {
        var origPath = axes.children[j];
        var numPoints = origPath.segments.length;

        // Generate a "new" version of the original axes, with different randomly generated points in the middle
        var newPath = new Path([origPath.segments[0].point, origPath.segments[numPoints-1].point]);
        addPoints(newPath, numPoints-2, 10);
        var tween = {};
        for (var i = 1; i < numPoints-1; i++) {
            var tweenString = 'segments[' + i.toString() + '].point';
            tween[tweenString] = newPath.segments[i].point;
        }
        origPath.tweenTo(tween, 200);
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
    // horizPath.fullySelected = true;
    var vertPath = new Path({segments: [topEndpoint, bottomEndpoint], strokeColor: 'black', strokeWidth: 6, strokeCap: 'round'});

    horizPath.strokeColor = 'black';
    vertPath.strokeColor = 'black';


    addPoints(horizPath, randInt(1,4), 10);
    addPoints(vertPath, randInt(1,4), 10);

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

