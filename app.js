var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express(),
	http = require('http'),
	ustil = require('util');

// DB connect string
var connect = "postgres://postgres:postgres@localhost/BookInforDB";

// Assign Dust Engine to .dust Files
app.engine('dust', cons.dust);

// Set deafult Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    // PostGres connect
    pg.connect(connect, function(err, client, done){
    	if (err) {
    		return console.error('error fetching client from pool', err);
    	}
    	client.query('SELECT * FROM public."BookInfor"', function(err, result){
    		if (err) {
    			return console.error ('error running query', err);
    		}
    		res.render('index', {books: result.rows});
    		done(); // Close connet
    	});
    });
});

app.post('/addbook', function(req, res){
	// PostGres connect
    pg.connect(connect, function(err, client, done){
    	if (err) {
    		return console.error('error fetching client from pool', err);
    	}
    	client.query('INSERT INTO public."BookInfor" (name, title, description) VALUES ($1, $2, $3)',
    		[req.body.name, req.body.title, req.body.description]);

		done();
		res.redirect('/');
    });
});

app.delete('/deletebook/:id', function(req, res){
	// PostGres connect
    pg.connect(connect, function(err, client, done){
    	if (err) {
    		return console.error('error fetching client from pool', err);
    	}
    	client.query('DELETE FROM public."BookInfor" WHERE id = $1',
    		[req.params.id]);

		done();
		res.sendStatus(200);
    });
});

app.post('/editbook', function(req, res){
	// PostGres connect
    pg.connect(connect, function(err, client, done){
    	if (err) {
    		return console.error('error fetching client from pool', err);
    	}
    	client.query('UPDATE public."BookInfor" SET name = $1, title = $2, description = $3 WHERE id = $4',
    		[req.body.name, req.body.title, req.body.description, req.body.id]);

		done();
		res.redirect('/');
    });
});

// show data from json

// Server
app.listen(8082, function(){
    console.log('Server start on Port 8082');
});