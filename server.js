const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const weather = require('./utils/weather');



app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index')
});

app.post('/', function (req, res) {
    let apiKey = weather.key;
    let city = req.body.city || 'irvine';
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body);

        if(weather === undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          res.render('index', {
              weather: weather.list,
              city: weather.city.name,
              country: weather.city.country,
              error: null
            });
        }
      }
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});