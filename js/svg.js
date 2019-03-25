var myPath = project.importSVG(document.getElementById('circle'), {expandShapes: true, applyMatrix: true}).children[0];
var centerPoint = myPath.bounds.center.clone();
myPath.pivot = centerPoint;
console.log(myPath)
// console.log(centerPoint)
myPath.position = view.center;
// myPath.reverse();
// console.log(myPath.position);
// console.log(myPath.segments)

// myPath.fullySelected = true;

var CIRCLERADIUS = 200;

var myPath2 = new Path.Circle({
    center: view.center,
    radius: CIRCLERADIUS
});
console.log(myPath2)

// myPath.fullySelected = true;
// Set the pivot point of the circle so it doesn't change

var lineText = 'test text';
var charOffset = myPath.length/lineText.length;
var textObjects = [];

for (var i = 0; i < lineText.length; i++) {
    textObjects.push(new PointText(myPath.getPointAt(i*100)));
    // console.log(textObjects[i].bounds.topLeft);
    // textObjects[i].bounds.selected = true;
    textObjects[i].fontSize = 24;
    textObjects[i].content = lineText.charAt(i);

    

    textObjects[i].pivot = new Point(textObjects[i].bounds.width/2,textObjects[i].bounds.height);
    textObjects[i].position = myPath.getPointAt(i*100)+(myPath.position-centerPoint);
}

// Add a new point for "wobble" effect
// var newSeg = new Segment(myPath.getLocationAt(myPath.length/8));
// newSeg.selected = true;
// newSeg.handleIn = new Point(-40, 40);
// newSeg.handleOut = new Point(40, -40);
// myPath.insertSegment(1, newSeg);
// myPath.smooth();

var mouseDown = false;

var point = new Point(0,0);

myPath.strokeColor = 'black';
// myPath.segments[0].handleOut = new Point((Math.random()-.5)*1000, (Math.random()-.5)*1000);
// myPath.fullySelected = true;

var prevAngle = -0.01;
var totalAngle = 0;

var movePoint = myPath.segments[5].point.clone();
project.view.onMouseMove = function(e) {
    // console.log(myPath.bounds.center);
    // Note that we want to calculate diff from centerPoint, because the center of the bounding box will change
    var pointDiff = (myPath.position) - e.point;
    // console.log(pointDiff.length)
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
    // console.log(totalAngle);
    // console.log(pointDiff.length)

    if (pointDiff.length > 100) {
        var pointRad = Math.min((Math.pow((pointDiff.length-100)*0.05, 2)+100)/CIRCLERADIUS, 1);
    } else {
        var pointRad = Math.min((Math.pow((pointDiff.length-100)*0.25, 2)+100)/CIRCLERADIUS, 1)
    }
    // console.log(curAngle)

    myPath.segments[5].point = (movePoint-centerPoint)*pointRad+centerPoint;

    
    // console.log(myPath.length)
    if (e.delta !== null) {

        for (var i = 0; i < textObjects.length; i++) {
            var curPos = (i*100) - ((curAngle/360)*myPath.length);
            if (curPos > myPath.length) {
                curPos = curPos % myPath.length;
            } else if (curPos < 0) {
                curPos += myPath.length;
            }

            var normAngle = myPath.getNormalAt(curPos).angle;
            console.log(myPath.getLocationAt(curPos).point)
            textObjects[i].position = myPath.getPointAt(curPos).rotate(curAngle-45, centerPoint)+(myPath.position-centerPoint);
            textObjects[i].rotation = normAngle+45+curAngle;
        }
    }
        prevAngle = curAngle;

}
    