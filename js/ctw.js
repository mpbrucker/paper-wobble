var ctw = project.importSVG(document.getElementById('text'), {expandShapes: true});
// ctw.scale(5);

var text = ctw.children[1];

project.view.onMouseMove = function(e) {
    // console.log(e.point);
    for (var i=0;i<text.children.length;i++) {
        for (var j=0;j<text.children[i].segments.length;j++) {
            var segment = text.children[i].segments[j];
            var delta = e.point - segment.point;
            if (delta.length < 50) {
                var normal = delta.rotate(100);
                segment.point -= normal*0.1;
            }
            
        }
        // text.children[i].position += Math.random();
    }
}

console.log(text.children);