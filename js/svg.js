var myPath = project.importSVG(document.getElementById('circle'), {expandShapes: true, applyMatrix: true}).children[0];
var centerPoint = myPath.bounds.center.clone();
myPath.pivot = centerPoint;
myPath.position = view.center;
var CIRCLERADIUS = 200;

// myPath.fullySelected = true;
// Set the pivot point of the circle so it doesn't change

var lineText = 'MATT BRUCKER COMPUTING+DESIGN  ';
var CHAROFFSET = myPath.length/lineText.length;
var textObjects = [];

for (var i = 0; i < lineText.length; i++) {
    textObjects.push(new PointText(myPath.getPointAt(0)));
    textObjects[i].fontSize = 24;
    textObjects[i].content = lineText.charAt(i);

    

    textObjects[i].pivot = new Point(textObjects[i].bounds.width/2,textObjects[i].bounds.height);
    updateText(myPath, textObjects, 45, centerPoint);

}
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
        var pointRad = Math.min((Math.pow((pointDiff.length-100)*0.35, 2)+100)/CIRCLERADIUS, 1)
    }
    // console.log(curAngle)

    myPath.segments[5].point = (movePoint-centerPoint)*pointRad+centerPoint;

    
    // console.log(myPath.length)
    if (e.delta !== null) {
        updateText(myPath, textObjects, curAngle, centerPoint);
    }
        prevAngle = curAngle;

}
    
/*
    Updates the positions of the text objects on the given path.
*/
function updateText (path, characters, angle, center) {
    for (var i = 0; i < characters.length; i++) {
        var curPos = (i*CHAROFFSET) - ((angle/360)*path.length);
        if (curPos > path.length) {
            curPos = curPos % path.length;
        } else if (curPos < 0) {
            curPos += path.length;
        }

        var normAngle = path.getNormalAt(curPos).angle;
        characters[i].position = path.getPointAt(curPos).rotate(angle-45, center)+(path.position-center);
        characters[i].rotation = normAngle+45+angle;
    }
}