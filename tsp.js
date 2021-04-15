var ciudades = [];
var Tciudades = 6;
var recordDistance;
var bestEver;
var order = [];




function setup() {
    createCanvas(400, 600);
    /* var c1 = createVector(50, 15);
     var c2 = createVector(80, 45);
     var c3 = createVector(100, 150);
     ciudades[0] = c1;
     ciudades[1] = c2;
     ciudades[2] = c3;*/
    for (var i = 0; i < Tciudades; i++) {
        var v = createVector(random(width), random(height / 2));
        ciudades[i] = v;
        order[i] = i;
    }

    var d = calcDistance(ciudades, order);
    recordDistance = d;
    bestEver = order.slice();

}



function draw() {
    background(0);
    frameRate(8);
    fill(255);
    for (var i = 0; i < order.length; i++) {
        ellipse(ciudades[i].x, ciudades[i].y, 8, 8);
    }

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < order.length; i++) {
        var n = order[i];
        vertex(ciudades[n].x, ciudades[n].y);
    }
    endShape();
    //S
    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < order.length; i++) {
        var n = bestEver[i];
        vertex(ciudades[n].x, ciudades[n].y);
    }

    endShape();
    ////
    ////


    var d = calcDistance(ciudades, order);
    if (d < recordDistance) {
        recordDistance = d;
        bestEver = order.slice();
    }



    text(64);
    var s = '';
    for (var i = 0; i < order.length; i++) {
        s += order[i];
    }
    fill(255);
    text(s, 20, height - 50);
    nextOrder();


}














function calcDistance(points, order) {
    var sum = 0;
    for (var i = 0; i < order.length - 1; i++) {
        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i + 1];
        var cityB = points[cityBIndex];
        var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }
    return sum;

}

















function swap(a, i, j) {
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

function nextOrder() {
    //S T E P :   1    
    var largestI = -1;
    for (var i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestI = i;
        }
    }
    if (largestI == -1) {
        noLoop();
        console.log("Finished");
    }
    //S T E P    2 
    var largestJ = -1;
    for (var j = 0; j < order.length; j++) {
        if (order[largestI] < order[j]) {
            largestJ = j;
        }
    }

    //S T E PP 3
    swap(order, largestI, largestJ);
    //S T E P 4 
    var endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);

}