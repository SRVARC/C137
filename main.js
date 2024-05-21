objects = [];
status = "";
video = "";

var recognition = new SpeechRecognition();

function SpeechRecognition()
{

}

function preload()
{

}

function setup()
{
    canvas = createCanvas(480,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video,0,120,480,450);
    if(status != "")
        {
            objectDetector.detect(video,gotResults);
            for(i=0; i < objects.length; i++)
                {
                    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
                    fill("#FF0000");
                    percent = floor(objects[i].confidence *100);
                    text(objects[i].label + "" + percent + "%" + objects[i].x + 15 , objects[i].y + 15);
                    noFill();
                    stroke("#FF0000");
                    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
                }
                if(objects[i].label == object_name)
                    {
                        video.stop();
                        objectDetector.detect(gotResults);
                    }
        }

        
    
}

recognition.onresult = function(event) {

    console.log(event);

    var Content = objects[i].label;
    console.log(Content);

    if(Content ==  object_name)
    {
        speak();
    }
}
function speak()
{
    var synth = window.speechSynthesis;

    speak_data =  object_name + "Found";

    var utterthis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterthis);
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
    document.getElementById("Status_1").innerHTML = 
    object_name = document.getElementById("search").value;
}

function modelLoaded()
{
    console.log("Model Loaded !");
    status = true;
}

function gotResults(error,results)
{
    if(error)
        {
            console.log(error);
        }
        console.log(results);
        objects = results;
}