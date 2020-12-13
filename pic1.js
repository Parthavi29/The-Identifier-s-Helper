myStatus = '';
output = [];

function preload() {
    img = loadImage('bedroom.jpg');
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
    console.log("get results has been called")
    if (error) {
        console.log("error = " + error);
    } else {
        console.log("results=" + results);
        output = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 400);
    //console.log(myStatus);
    if (myStatus != "") {
        //console.log(output);
        for (var a = 0; a < output.length; a++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            objectName = output[a].label;
            percentage = floor(output[a].confidence * 100);
            height = output[a].height;
            width = output[a].width;
            positionX = output[a].x;
            positionY = output[a].y;
            console.log("hello");
            fill('#001e1d');
            text(objectName + ' ' + percentage + '%', positionX, positionY);
            noFill();
            stroke('#001e1d');
            rect(positionX, positionY, width, height);
        }
    }
}