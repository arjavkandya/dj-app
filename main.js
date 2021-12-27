leftWristx=0;
leftWristY=0;
rightWristx=0;
rightWristy=0;
scoreLeftWrist=0;
scorerightWrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotResult);
}
function gotResult(results){
    if(results.length>0){
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left Wrist x="+leftWristx+"left Wrist y="+leftWristY);
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("right Wrist x="+rightWristx+"right Wrist y="+rightWristy);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist="+scoreLeftWrist);
    }
}
function modelLoaded(){
    console.log("model has started");
}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    circle(leftWristx,leftWristY,20);
    fill("#ff0000");
    stroke("#ff0000");
    circle(rightWristx,rightWristy,20);
    if(scorerightWrist>0.2){

    
    if(rightWristx>0 && rightWristy <=100)
    {
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200)
    {
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristy>200 && rightWristy<=300)
    {
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristy>300 && rightWristy<=400)
    {
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristy>400 && rightWristy<=500)
    {
        document.getElementById("speed").innerHTML="speed=2.5x"
         song.rate(2.5);
    }
}
    if(scoreLeftWrist>0.2){
      
    
    number_leftWrist=Number(leftWristY);
    remove_decimal=floor(number_leftWrist);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
    }
    
}

function preload(){
song=loadSound("titanic.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
