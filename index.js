var express = require('express');
var app = express();
app.use(express.static('./libs'));
app.set('view engine', 'ejs');
app.set('views', './views');

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

io.on('connection', function(socket) {
	//socket same with every connection
	//example socket.id = 1
	//example socket.id = 2...
	console.log('socket', socket.id);
	socket.on('disconnect', function() {
		console.log('disconnect: ', socket.id);
	});
	socket.on('Client-send-data', function(data) {
		console.log('data from client', data);
		//A sent mess and Server will sent it to A B C D... (all connection recieve mess)
		//io.sockets.emit('Server-send-data', data + '-case 1')

		//A sent mess and Server will only sent it to A
		//socket.emit('Server-send-data', data + '-case 2');
		
		//A sent mess and Server will sent it to B C D expect A
		socket.broadcast.emit('Server-send-data', data + '-case 3');

		//A sent mess to 1 connection
		// io.to('zc47xc12xcz1t623c').emit();//zc47xc12xcz1t623c = socket id

	});
});

//create new route
app.get('/', function(req, res) {
	res.render('home');
});

