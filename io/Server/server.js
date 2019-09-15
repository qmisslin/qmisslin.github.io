const http = require('http');
const fs = require('fs');
const socket = require('socket.io');

// Server conscructor
function Server () {
    console.log("Server create.");
    this.process = null;

    // Server information
    this.state = {
        connected: [],
    };
}

// Message format validation
Server.prototype.msgIsValid = function (msg) {
    return (msg == null || msg.exp == null);
}

// Add client to list
Server.prototype.add_client = function () {
    let id = (
        Date.now().toString(36) + 
        Math.random().toString(36).substr(2, 5)
    ).toUpperCase();

    let client = {
        id: id, // User is private information
        name: 'User_' + this.state.connected.length,
    };

    this.state.connected.push(client);
    return client;
}

Server.prototype.getState = function () {
    let state = { ...this.state };
    state.connected.forEach(e => e.id = 'Protected');
    return state;
}

// Remove client from list
Server.prototype.remove_client = function (id) {
    this.state.connected = this.state.connected.filter(e => e.id != id);
}

// Start server
Server.prototype.start = function () {

    console.log("Server starting.");

    let that = this;
    this.process = http.createServer(function (req, res) {
        that.response(req, res);
    });

    // Load socket.io
    var io = socket.listen(this.process);   

    // Event in console when client is connect
    io.sockets.on('connection', function (socket) {

        let client = that.add_client();

        // Validate connexion
        socket.emit('server', {
            title: 'Connexion validation',
            client: client,
        });
    
        // Broadcast message for all connected clients  
        socket.on('message', function (msg) {
            if(msgIsValid(msg)) {

                // Send msg for all users
                socket.broadcast.emit('message', msg);
                console.log('SERVER - ' + msg.exp + ' : ' + msg);
            } else {

                // Send error message
                socket.emit('message', {
                    title: 'Error : Message format or id is not correct.',
                    client: client,
                });
            }
        });

        // Get server information
        socket.on('get_info', function (msg) {
            socket.emit('server', {
                title: 'Server informations',
                state: that.getState()
            });
        })
    });

    // Start listening
    this.process.listen(8080);
}


// Send response once client is connected
Server.prototype.response = function (req, res) {

    // Get url
    var page = url.parse(req.url).pathname;

    // Get params array in url (access with params['key'] if 'key' in params)
    var params = querystring.parse(url.parse(req.url).query);

    // Get page and get content
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(content);
        res.end();
    });
}


/* Create and start server */
console.log("Start process.");
let server = new Server();
server.start();