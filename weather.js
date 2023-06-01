const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");
const app = express(); //function that binds express module - initialize new express app

app.use(bodyParser.urlencoded({extended: true}));//To parse data from html form - urlencoded, set extended objs to true - extending to nested objs
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
}); //Where to get the req from

app.post("/", function(req,res){
    var cityname = req.body.CityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=6216c145c485870150b842de5583053d&units=metric";
    https.get(url, function(resp){

        resp.on("data", function(data){
            var wdata = JSON.parse(data);//changes raw data to a javascript object
            const temp = wdata.main.temp;
            const flike = wdata.main.feels_like;
            const temp_min = wdata.main.temp_min;
            const temp_max = wdata.main.temp_max;
            const pres = wdata.main.pressure;
            const humidty = wdata.main.humidity;
            const desc = wdata.weather[0].description;
            const iconw = wdata.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" +iconw+ "@2x.png";
            res.write("<h1>Weather in " +cityname + "</h1>");
            res.write("<p>Temperature in "+cityname+ " is "+temp+" Degrees Celsius</p>");
            res.write("<p>Feels like "+flike+" Degrees Celsius</p>");
            res.write("<p>"+desc+"</p>");
            res.write("<img src = " + imageURL +">");
            res.write("<p>Mininum Temperature today in " +cityname+ " is " +temp_min+" Degrees Celsius</p>");
            res.write("<p>Maximum Temperature today in " +cityname+ " is " +temp_max+" Degrees Celsius</p>");
            res.write("<p>Atmospheric Pressure in " +cityname+ " is " +pres+" Pascal</p>");
            res.write("<p>Humidity in " +cityname+ " is " +humidty+" Grams per cubic metre</p>");
            res.send();
        });
    });
});
app.listen(3000,function(){
    console.log("Server is listening on port 3000")
});