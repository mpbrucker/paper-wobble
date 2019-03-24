
var myPath = new Path.Circle({
    center: view.center,
    radius: 200
});

myPath.selected = true;

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

var newSeg = new Segment(myPath.getLocationAt(myPath.length/8));
myPath.insertSegment(1, newSeg);

var mouseDown = false;

var point = new Point(0,0);

myPath.strokeColor = 'black';
// myPath.segments[0].handleOut = new Point((Math.random()-.5)*1000, (Math.random()-.5)*1000);
// myPath.fullySelected = true;

var prevAngle = -0.01;
project.view.onMouseMove = function(e) {
    // console.log(myPath.bounds.center);
    var curAngle = (myPath.bounds.center - e.point).angle;
    if (curAngle < 0) {
        curAngle += 360;
    }
    // console.log(curAngle);
    // myPath.rotation = (myPath.bounds.center - e.point).angle*(3.14/180);
    if (prevAngle < 0) { // Initial rotation to position the point in the correct position
        myPath.rotate(curAngle-45);
    } else {
        myPath.rotate(curAngle-prevAngle);
    }
    prevAngle = curAngle;
    
    // if (e.delta !== null) {
    //     point = e.delta;
    //     for (var i = 0; i < myPath.segments.length; i++) {
    //         var curSeg = myPath.segments[i];
    //         // console.log(curSeg.handleIn);
    //         curSeg.handleIn.x += point.x*.1;
    //         curSeg.handleIn.y += point.y*.1;
    //     }

    //     for (var i = 0; i < textObjects.length; i++) {
    //         var normAngle = myPath.getNormalAt(i*100).angle;

    //         textObjects[i].position = myPath.getPointAt(i*100);
    //         textObjects[i].rotation = normAngle+90;
    //     }
    // }
}
    