const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();
const port = 3000
const apiToken = 'c029ae1abf886504e57312fd06dae66d'
//'c79646a737c7d1470cd7e82787e540a3'
const database = require('./database');

server.get('/', (req, res) => {
    res.send("<h2>Connect</h2>");
});

server.post('/login', bodyParser.json(), (req, res) => { 
    res.send({data: req.body.login})
});

server.post('/regist', bodyParser.json(), (req, res) => { 
    if (req.body.login == '' || req.body.pass == '' || req.body.pass2 =='' || req.body.email == '') {
        res.send({data: "Заполните все данные"}) 
    } else {
        if (!(/[a-zA-Z][0-9]/.test(req.body.login))) {
            res.send({data: "Логин должен иметь латинские буквы и цифры"})    
        } else {
            if (!(/[a-z]/.test(req.body.pass))) {
                res.send({data: "Пароль должен иметь латинские буквы в нижнем регистре"})   
            } else {
                if (req.body.pass !== req.body.pass2) {
                    res.send({data: "Пароли должны совпадать"})  
                } else {
                    if (req.body.email.indexOf("@") == -1) {
                        res.send({data: "В E-mail отсутствует символ @"})     
                    } else {
                        res.send({data: "Поздравляем, вы успешно зарегистрированы!"})  
                    }
                }          
            }   
        }
    }
});

server.post('/getCityCoordinates', bodyParser.json(), (req, response) => { 
    http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}.'&limit=1&appid=${apiToken}`, res => {
        let data = [];
        res.on('data', chunk => {
            data.push(chunk);
        });
        res.on('end', () => {
            console.log('Response ended: 1');
            const coordinates = JSON.parse(Buffer.concat(data).toString());
            if (coordinates.length) {
                http.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=${apiToken}`, res2 => {
                    let data = [];         
                    res2.on('data', chunk => {
                        data.push(chunk);
                    });
                    res2.on('end', () => {
                        console.log('Response ended: 2');
                        const pollutionData = JSON.parse(Buffer.concat(data).toString());
                        database.getHistory(req.body.city,pollutionData).catch(error => {
                            console.log(error);
                        })
                        response.send(pollutionData)
                    });         
                })
            } else {
                response.send([])
            }      
        });      
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
});

server.listen(port, () => {
    console.log('сервер успешно запущен. Порт: '+port);
})