function makeWobble(id, text, position, radius) {
    var circlePath = project.importSVG(document.getElementById(id), {expandShapes: true}).children[0];
    var centerPoint = circlePath.bounds.center.clone(); // Set the pivot point of the circle so it doesn't change
    circlePath.pivot = centerPoint;
    circlePath.position = position;
    circlePath.strokeColor = 'black';
    var textObjects = [];
    
    var CIRCLERADIUS = radius;
    var lineText = text;
    var CHAROFFSET = circlePath.length/lineText.length;

    var movePoint = circlePath.segments[5].point.clone();
    var expansion, prevAngle, angleDelta;
    var curAngle = 45;


    for (var i = 0; i < lineText.length; i++) {
        textObjects.push(new PointText(circlePath.getPointAt(0)));
        textObjects[i].fontSize = 24;
        textObjects[i].content = lineText.charAt(i);
        // Set correct rotation point for characters
        textObjects[i].pivot = new Point(textObjects[i].bounds.width/2,textObjects[i].bounds.height);
        updateText(circlePath, textObjects, curAngle, centerPoint);

    }

    project.view.onMouseMove = function(e) {
        var pointDiff = (circlePath.position) - e.point;
        curAngle = pointDiff.angle;

        // Initial rotation to position the point in the correct position
        angleDelta = prevAngle == null ? curAngle-45 : curAngle-prevAngle;
        circlePath.rotate(angleDelta);

        // Calculate how 
        expansion = pointDiff.length > 100 ? 0.05 : 0.35;
        var pointRad = Math.min((Math.pow((pointDiff.length-100)*expansion, 2)+100)/CIRCLERADIUS, 1);

        // Move the "wobble" point
        circlePath.segments[5].point = movePoint*pointRad+centerPoint*(1-pointRad);
        updateText(circlePath, textObjects, curAngle, centerPoint);
        prevAngle = curAngle;
    }

    project.view.onResize = function(e) {
        console.log('resize');
        circlePath.position = view.center;
        updateText(circlePath, textObjects, curAngle, centerPoint);
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
}

makeWobble('circle', 'MATT BRUCKER COMPUTING+DESIGN  ', view.center, 200)