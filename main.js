status = "";
alarm = "";
objects = [];

function preload() {
    alarm = loadSound("TF004.WAV");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    document.getElementById("person_status").innerHTML = "Initializing";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error , results) {
 if (error) {
     console.error(error);
 }
 else {
     console.log(results);
     objects = results ; 
 }
}

function draw() {
    image(video , 0 , 0 , 380 ,380);

    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        
        objectDetector.detect(video , gotResult);
        for (i = 0 ; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person")
          {
            document.getElementById("person_status").innerHTML = "Baby Found";
            console.log("stop");
            alarm.stop();
          }
          else
          {
            document.getElementById("person_status").innerHTML = "Baby Not Found";
            console.log("play"); 
            alarm.play();
          }
        } 
        if(objects.length == 0)
        {
          document.getElementById("person_status").innerHTML = "Baby Not Found";
          console.log("play"); 
          alarm.play();
        }
    }
}