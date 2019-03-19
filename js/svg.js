
var myPath = new Path.Circle({
    center: view.center,
    radius: 200
});

var lineText = 'test text';
var textObjects = [];
console.log(myPath.length);

for (var i = 0; i < lineText.length; i++) {
    textObjects.push(new PointText(myPath.getPointAt(i*100)));
    textObjects[i].fontSize = 24;
    textObjects[i].content = lineText.charAt(i);
}

var mouseDown = false;

var point = new Point(0,0);

myPath.strokeColor = 'black';
// myPath.segments[0].handleOut = new Point((Math.random()-.5)*1000, (Math.random()-.5)*1000);
// myPath.fullySelected = true;

project.view.onMouseMove = function(e) {
    
    if (e.delta !== null) {
        point = e.delta;
        for (var i = 0; i < myPath.segments.length; i++) {
            var curSeg = myPath.segments[i];
            // console.log(curSeg.handleIn);
            curSeg.handleIn.x += point.x*.1;
            curSeg.handleIn.y += point.y*.1;
        }

        for (var i = 0; i < textObjects.length; i++) {
            textObjects[i].position = myPath.getPointAt(i*100);
        }
    }
}
    