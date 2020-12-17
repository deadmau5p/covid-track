var express = require('express');
var cors = require('cors')
var app = express();
var port = process.env.port || 5000;
var path = require('path')
var request = require('request');





app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get("/getGlobalData", (req, res) =>{
    
    request('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-05-2020.csv', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
        
    })
})

app.get(`/countries`, (req, res) => {
    request("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", function(error ,response, body){
        if(!error && response.statusCode === 200)
            res.send(body)
    })
})

app.listen(port, () => {
    console.log("Server is running on: " + port)
})

