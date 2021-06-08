const express = require("express");

var geoip = require("geoip-lite");

const app = express();
const fetch = require('node-fetch');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine','ejs');
app.use(express.static("public"));
var https = require("https");
var http = require("http");
var query = "";
var tempe = 0;

var desc = "";
var dateva = "";
var windval = 0;
var humid = 0;
var feelslike = 0;
var imgurl = "",url1 = "",url2 = "",url3 ="",url4 = "";
var firstday = "",secondday = "",thirdday = "",fourthday = "";
var temp1 = 0,temp2 = 0,temp3 = 0,temp4 = 0;



app.get("/",function(req,res){
    if(query == "")
    {
        var currurl = "https://ipinfo.io/49.37.36.112?token=d0a1b6f74b7458"
        
        https.get(currurl,function(resp)
        { 
            
            resp.on("data",function(data){
                const currdata = JSON.parse(data);
                query = currdata.city;
               // var url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"+&appid="+ apikey+ "&units="+unit;
               var url = "http://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid=5a1d96dc242f626d8bea69b847a517d0&cnt=40&units=metric"
   
               
               http.get(url,function(response)
                {
                    let body = "";
                    response.on("data",function(data)
                    {
                       body += data;
                   });
                    response.on("end",function(){
                    const weatherdata = JSON.parse(body);
                    
                    tempe = weatherdata.list[0].main.temp
                   
                    desc = weatherdata.list[0].weather[0].description
                    var datev = weatherdata.list[0].dt_txt
                    dateva = "";
                    for(var i=0;i<10;i++){
                        dateva +=datev[i];
                    }
                         
//                    console.log(dateva);

                    humid = weatherdata.list[0].main.humidity
                    windval = weatherdata.list[0].wind.speed
                    feelslike = weatherdata.list[0].main.feels_like
                    var weicon = weatherdata.list[0].weather[0].icon
                    imgurl = "http://openweathermap.org/img/wn/" +weicon+ "@2x.png"

                    var icon1 = weatherdata.list[5].weather[0].icon
                    url1 = "http://openweathermap.org/img/wn/" +icon1+ "@2x.png"

                    var icon2 = weatherdata.list[13].weather[0].icon
                    url2 = "http://openweathermap.org/img/wn/" +icon2+ "@2x.png"

                    var icon3 = weatherdata.list[21].weather[0].icon
                    url3 = "http://openweathermap.org/img/wn/" +icon3+ "@2x.png"

                    var icon4 = weatherdata.list[29].weather[0].icon
                    url4 = "http://openweathermap.org/img/wn/" +icon4+ "@2x.png"



                    firstday = "";
                    for(var i=0;i<10;i++){
                        firstday += weatherdata.list[5].dt_txt[i];
                        }
                        seconday = ""
                        for(var i=0;i<10;i++){
                        secondday += weatherdata.list[13].dt_txt[i];
                        }
                        thirdday = ""
                       for(var i=0;i<10;i++){
                        thirdday += weatherdata.list[21].dt_txt[i];
                       }
                       fourthday = ""
                       for(var i=0;i<10;i++){
                        fourthday += weatherdata.list[29].dt_txt[i];
                        }
                       
                        
                       temp1 = weatherdata.list[5].main.temp
                       temp2 = weatherdata.list[13].main.temp
                       temp3 = weatherdata.list[21].main.temp
                       temp4 = weatherdata.list[29].main.temp
                   
            res.render("index",{citytemp : tempe,cityname : query, weatherdesc : desc,dateval :dateva,
                                humidity : humid,wind : windval,feel : feelslike,image : imgurl,
                                img1 : url1, img2 : url2 , img3 : url3,img4 : url4,
                                first : firstday,second : secondday,third : thirdday , fourth : fourthday,
                                citytemp1 : temp1,citytemp2 : temp2,citytemp3 : temp3,citytemp4 : temp4});
            })
        });
        });});
        }
    else{
    
       
   
    res.render("index",{citytemp : tempe,cityname : query, weatherdesc : desc,dateval:dateva,
                        humidity : humid,wind : windval ,feel : feelslike, image : imgurl,
                        img1 : url1, img2 : url2 , img3 : url3,img4 : url4,
                        first : firstday,second : secondday,third : thirdday , fourth : fourthday,
                        citytemp1 : temp1,citytemp2 : temp2,citytemp3 : temp3,citytemp4 : temp4});
    }
});



 app.post("/",function(req,res){

    
    query = req.body.cityname;
        
   
    
   
   // var url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"+&appid="+ apikey+ "&units="+unit;
   var url = "http://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid=5a1d96dc242f626d8bea69b847a517d0&cnt=40&units=metric"
   
   
   http.get(url,function(response)
    {
       
        let body = "";
       response.on("data",function(data)
       {
             body += data;
       });
        response.on("end",function(){
           const weatherdata = JSON.parse(body);
       
        
        tempe = weatherdata.list[0].main.temp
      
       desc = weatherdata.list[0].weather[0].description
                                 
       
       var weicon = weatherdata.list[0].weather[0].icon
       imgurl = "http://openweathermap.org/img/wn/" +weicon+ "@2x.png"

       var icon1 = weatherdata.list[5].weather[0].icon
       url1 = "http://openweathermap.org/img/wn/" +icon1+ "@2x.png"

       var icon2 = weatherdata.list[13].weather[0].icon
       url2 = "http://openweathermap.org/img/wn/" +icon2+ "@2x.png"

       var icon3 = weatherdata.list[21].weather[0].icon
       url3 = "http://openweathermap.org/img/wn/" +icon3+ "@2x.png"

       var icon4 = weatherdata.list[29].weather[0].icon
       url4 = "http://openweathermap.org/img/wn/" +icon4+ "@2x.png"
       
      // var datev = weatherdata.list[0].dt_txt
       dateva = "";
       for(var i=0;i<10;i++){
        dateva +=  weatherdata.list[0].dt_txt[i];
        } 
        
        humid = weatherdata.list[0].main.humidity
        windval = weatherdata.list[0].wind.speed
        feelslike = weatherdata.list[0].main.feels_like

        firstday = "";
       for(var i=0;i<10;i++){
        firstday += weatherdata.list[5].dt_txt[i];
        }

        secondday = "";
        for(var i=0;i<10;i++){
        secondday += weatherdata.list[13].dt_txt[i];
        }

        thirdday = "";
       for(var i=0;i<10;i++){
        thirdday += weatherdata.list[21].dt_txt[i];
       }
       fourthday = "";
       for(var i=0;i<10;i++){
        fourthday += weatherdata.list[29].dt_txt[i];
        }
       
        
       temp1 = weatherdata.list[5].main.temp
       temp2 = weatherdata.list[13].main.temp
       temp3 = weatherdata.list[21].main.temp
       temp4 = weatherdata.list[29].main.temp
        

})
    });
 res.redirect("/");


 
 });


    
    
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at port 3000");
});
