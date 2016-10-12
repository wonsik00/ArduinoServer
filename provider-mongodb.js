var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

SensorProvider = function(host,port) {
	this.db = new Db('test',new Server(host,port,{auto_reconnect:true}),{safe:false});
	this.db.open(function(err) {
		if (!err) console.log('We are connected');
		else console.log(err);
	});
}
SensorProvider.prototype.sensorSave = function(data, callback) {
	this.db.collection('sensor_logs').save(data, function(err, result) {
		if (err) callback(err);
		else callback(null, result);
	});
}
SensorProvider.prototype.sensorFindAll = function(cond, callback) {
	this.db.collection('sensor_logs').find(cond).toArray(function(err, result) {
		if (err) callback(err);
		else callback(null, result);
	});
}
exports.SensorProvider = SensorProvider;