var express = require('express');
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var parsedData = JSON.parse(data);
		res.render('index', {users: parsedData});
	});
});

app.get('/sendJSON', function (req, res) {
	fs.readFile('./users.json', function (error, data) {
			if (error) {
			response.send(error);
			return;
		}
		var parsedData = JSON.parse(data);
		console.log(parsedData)
		res.send({users: parsedData})
	});
});

app.get('/form', function (req, res) {
		fs.readFile('./users.json', function (error, data) {
		if (error) {
			response.send(error);
			return;
		}

		var parsedData = JSON.parse(data);
		var tags = parsedData
		var strData = JSON.stringify(parsedData)

	res.render('form', {
			users: parsedData
		});
	});
});

app.post('/form', function (req, res) {
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var jsonDataNew = JSON.parse(data);
		JSON.stringify(jsonDataNew);
	});
	res.render('form', {list: jsonDataNew});
});

app.post('/searchuser', function(req,res){
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var jsonData = JSON.parse(data);
		JSON.stringify(req.body);
		var userSend = req.body;
		res.render('searchuser', {users: jsonData, user: userSend});
	});
	console.log(req.body)
});

app.get('/newuser', function (req, res) {
	res.render('newuser');
});

app.post('/newuser', function(req,res) {
	var firstname = req.body.fname
	var lastname = req.body.lname
	var email = req.body.email

	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var jsonDataNew = JSON.parse(data);
		JSON.stringify(jsonDataNew);

		jsonDataNew.push({ firstname: firstname, lastname: lastname, email: email });
		var newUser = JSON.stringify(jsonDataNew);

	 	fs.writeFile("./users.json", newUser, function(err) {
            if (err) {
                throw err;
            }
        })
		return res.redirect('/');
	});
});

var server = app.listen(3000, function () {
	console.log('Listening on port: ' + server.address().port);
});

