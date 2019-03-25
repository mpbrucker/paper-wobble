var circlePath = project.importSVG(document.getElementById('circle'), {expandShapes: true, applyMatrix: true}).children[0];
var centerPoint = circlePath.bounds.center.clone();
circlePath.pivot = centerPoint;
circlePath.position = view.center;
var CIRCLERADIUS = 200;
circlePath.strokeColor = 'black';


// circlePath.fullySelected = true;
// Set the pivot point of the circle so it doesn't change

var lineText = 'MATT BRUCKER COMPUTING+DESIGN  ';
var CHAROFFSET = circlePath.length/lineText.length;
var textObjects = [];

for (var i = 0; i < lineText.length; i++) {
    textObjects.push(new PointText(circlePath.getPointAt(0)));
    textObjects[i].fontSize = 24;
    textObjects[i].content = lineText.charAt(i);
    // Set correct rotation point for characters
    textObjects[i].pivot = new Point(textObjects[i].bounds.width/2,textObjects[i].bounds.height);
    updateText(circlePath, textObjects, 45, centerPoint);

}


// circlePath.segments[0].handleOut = new Point((Math.random()-.5)*1000, (Math.random()-.5)*1000);
// circlePath.fullySelected = true;

var prevAngle = -0.01;
var movePoint = circlePath.segments[5].point.clone();
var expansion;
var angleDelta;

project.view.onMouseMove = function(e) {
    var pointDiff = (circlePath.position) - e.point;
    var curAngle = pointDiff.angle;

    // Account for negative angles
    if (curAngle < 0) {
        curAngle += 360;
    }

    // Initial rotation to position the point in the correct position
    angleDelta = prevAngle < 0 ? curAngle-45 : curAngle-prevAngle;
    circlePath.rotate(angleDelta);

    // Calculate how 
    expansion = pointDiff.length > 100 ? 0.05 : 0.35;
    var pointRad = Math.min((Math.pow((pointDiff.length-100)*expansion, 2)+100)/CIRCLERADIUS, 1);

    // Move the "wobble" point
    circlePath.segments[5].point = movePoint*pointRad+centerPoint*(1-pointRad);
    updateText(circlePath, textObjects, curAngle, centerPoint);
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