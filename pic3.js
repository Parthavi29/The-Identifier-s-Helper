myStatus = '';
output = [];

function preload() {
    img = loadImage('bottles.jpg');
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    detector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Object Detecting";
}

function modelLoaded() {
    console.log("Model has been ACTIVATED!!!!!!!!!!!!!!!!!")
    myStatus = true;
    detector.detect(img, getResults);
}

function getResults(results, error) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        output = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 400);

    if (myStatus != "") {
        for (var a = 0; a < output.length; a++) {
            console.log("hi");
            document.getElementById("status").innerHTML = "Status : Object Detected";
            objectName = output[a].label;
            percentage = floor(output[a].confidence * 100);
            height = output[a].height;
            width = output[a].width;
            positionX = output[a].x;
            positionY = output[a].y;

            fill('#001e1d');
            text(objectName + ' ' + percentage + '%', positionX, positionY);
            noFill();
            stroke('#001e1d');
            rect(positionX, positionY, width, height);
        }
    }
}