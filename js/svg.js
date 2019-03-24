var CIRCLERADIUS = 200;

var myPath = new Path.Circle({
    center: view.center,
    radius: CIRCLERADIUS
});

// myPath.fullySelected = true;
// Set the pivot point of the circle so it doesn't change
myPath.pivot = myPath.bounds.center;

var lineText = 'test text';
var textObjects = [];

for (var i = 0; i < lineText.length; i++) {
    textObjects.push(new PointText(myPath.getPointAt(i*100)));
    // console.log(textObjects[i].bounds.topLeft);
    // textObjects[i].bounds.selected = true;
    textObjects[i].fontSize = 24;
    textObjects[i].content = lineText.charAt(i);

    

    textObjects[i].pivot = new Point(textObjects[i].bounds.width/2,textObjects[i].bounds.height);
    textObjects[i].position = myPath.getPointAt(i*100);
}

// Add a new point for "wobble" effect
var newSeg = new Segment(myPath.getLocationAt(myPath.length/8));
console.log(myPath.getLocationAt(myPath.length/8));
// newSeg.selected = true;
// newSeg.handleIn = new Point(-40, 40);
// newSeg.handleOut = new Point(40, -40);
myPath.insertSegment(1, newSeg);
console.log(myPath.segments[1].point)
// myPath.smooth();

var mouseDown = false;

var point = new Point(0,0);

myPath.strokeColor = 'black';
// myPath.segments[0].handleOut = new Point((Math.random()-.5)*1000, (Math.random()-.5)*1000);
// myPath.fullySelected = true;

var prevAngle = -0.01;
var totalAngle = 0;
project.view.onMouseMove = function(e) {
    // console.log(myPath.bounds.center);

    var pointDiff = myPath.bounds.center - e.point;
    var curAngle = pointDiff.angle;

    if (curAngle < 0) {
        curAngle += 360;
    }
    if (prevAngle < 0) { // Initial rotation to position the point in the correct position
        myPath.rotate(curAngle-45);
    } else {
        myPath.rotate(curAngle-prevAngle);
    }
    totalAngle += curAngle-prevAngle;
    // console.log(curAngle);
    // console.log(totalAngle);
    // console.log(pointDiff.length)

    if (pointDiff.length > 150) {
        var pointRad = Math.min(Math.pow((pointDiff.length-150)*0.05, 2)+150, CIRCLERADIUS)
    } else {
        var pointRad = Math.min(Math.pow((pointDiff.length-150)*0.25, 2)+150, CIRCLERADIUS)
    }

    myPath.segments[1].point = (pointDiff.normalize()*-pointRad)+myPath.bounds.center;

    
    console.log(myPath.length)
    if (e.delta !== null) {
        point = e.delta;

        for (var i = 0; i < textObjects.length; i++) {
            var curPos = (i*100) - ((curAngle/360)*myPath.length);
            if (curPos > myPath.length) {
                curPos = curPos % myPath.length;
            } else if (curPos < 0) {
                curPos += myPath.length;
            }

            var normAngle = myPath.getNormalAt(curPos).angle;

            textObjects[i].position = myPath.getPointAt(curPos);
            textObjects[i].rotation = normAngle+90;
        }
    }
        prevAngle = curAngle;

}
    