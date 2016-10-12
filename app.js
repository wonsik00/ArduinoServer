
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); sc s c
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/routes',express.static(__dirname+"/routes"));

app.get('/users', user.list);
var SensorProvider = require('./provider-mongodb').SensorProvider;
var sensorProvider = new SensorProvider('localhost',27017);

// development only
if ('development' == app.get('env')) {
 app.use(express.errorHandler());
}

app.get('/routes/index', routes.index);

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname+'/chart3.html'));
});

app.get('/data.json', function (req,res) {
	sensorProvider.sensorFindAll({},function(err,results) {
		res.send(JSON.stringify(results));
	});
});

//CREATE
app.get('/set', function(req,res) {
	var s_id;
	var dt = new Date();
	s_id = Number(req.param('ard_id'));
	dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + (10*Math.floor(dt.getSeconds()/10));
	
	if( s_id == 1 ) {
		sensorProvider.sensorSave( {device:Number(1),temp:Number(req.param('temp')),
			humidity:Number(req.param('humidity')),led:Number(req.param('led')),light:Number(req.param('light')),created_at:dt} , function(err,result) {
				res.json(result);
			});
	}
	else if ( s_id == 2) {
		sensorProvider.sensorSave( {device:Number(2),temp:Number(req.param('temp')),
			humidity:Number(req.param('humidity')),led:Number(req.param('led')),light:Number(req.param('light')),created_at:dt} , function(err,result) {
				res.json(result);
			});
	}
	else if ( s_id == 3) {
		sensorProvider.sensorSave( {device:Number(3),temp:Number(req.param('temp')),
			humidity:Number(req.param('humidity')),led:Number(req.param('led')),light:Number(req.param('light')),created_at:dt} , function(err,result) {
				res.json(result);
			});
	}

});

//READ
app.get('/list/all', function(req,res) {
	sensorProvider.sensorFindAll({},function(err,results) {
		res.json(results);
	});
});

app.get('/list/arduino1', function(req,res) {
	sensorProvider.sensorFindAll({device:1},function(err,results) {
		res.json(results);
	});
});

app.get('/list/arduino2', function(req,res) {
	sensorProvider.sensorFindAll({device:2},function(err,results) {
		res.json(results);
		});
	});
app.get('/list/arduino3', function(req,res) {
		sensorProvider.sensorFindAll({device:3},function(err,results) {
		
			
			
			res.json(results);
		});
	});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
