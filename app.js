// // Starting with your previous website, create a new branch to preserve the old site.
// // Your site has a form on it that acts like a search bar. When someone types 
// into the search bar, it should retrieve a list of matching users and 
// list them by name on the same page, similar to how the search bars on 
// airbnb.com or hipmunk.com function.

// // Once the user submits the search bar, it should exhibit the same behavior as
//  the previous assignment, i.e. display a new page with the search results.

// every key press should create:
// drop down menu that lists matching users.
// if key = pressed, it should check within the arrays.name if the letters match.
// if letter in string.indexOf === key input --> show matching users in list
// 'Blue Whale'.indexOf('Blue') !== -1; // true
// 'Blue Whale'.indexOf('Bloe') !== -1; // false
// for loop

// function allIndex(array, input) {
// 	var emptyArray = [];
	
// 	for (var i = 0; i < array.length; i++) {
// 		if(input == array[i]) {
// 			emptyArray.push(array.indexOf(input));
// 			delete array[i];
// 		};
// 	};
// 	console.log(emptyArray);
// 	};

// allIndex(array, 'orange');


// // Hints:

// // use https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/
// Global_Objects/String/indexOf (Links to an external site.)Links to an external site.
// // you cannot send or render a response more than once per request.
// // you must find a way to capture whenever the user's input changes in 
// the search bar. This will trigger your Ajax request to your server.


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

