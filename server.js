const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');

// middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(`${now}: ${req.method} ${req.url}`);
	fs.appendFile('log.txt', `${now}: ${req.method} ${req.url}\n`, (errorMessage) => {
		if (errorMessage) {
			console.log('Unable to log to file');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs', {
		name: 'Debayan',
		age: 24,
		passion: 'Programming and Developing',
		pageTitle: 'Generic header',
		para1: 'Here you get helped for your queries.'
	});
});

app.get('/about', (req, res) => {
	// res.send('About page');
	res.render('about.hbs', {
		pageTitle: 'Know about us',
		para1: 'Here you get helped for your queries.'
	});
});

app.get('/projects', (req, res) => {
	// res.send('About page');
	res.render('projects.hbs', {
		pageTitle: 'Github Projects',
		para1: 'You can check out the github projects'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Something went wrong'
	})
});

app.listen(port, () => {
	console.log(`Server is up at port ${port}`);
});
