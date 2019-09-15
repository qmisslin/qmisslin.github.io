function Client() {

    let that = this;

    // Define socket
    this.socket = io.connect('http://localhost:8080');
    this.data = null;

    // Receive server message
    this.socket.on('server_connexion', 
        function(m) {that.connexion(m)});
    this.socket.on('message', 
        function(m) {that.message(m)});
    this.socket.on('server_information', 
        function(m) {that.serverInformation(m)});
    this.socket.on('server_error', 
        function(m) {that.serverError(m)});
}

Client.prototype.connexion = function (m) {
    console.log(m.title, m.client);
    this.data = m.client;
}

Client.prototype.message = function (m) {
    console.log("Receive message : ", m);
}

Client.prototype.serverInformation = function (m) {
    console.log(m.title, m.state);
}

Client.prototype.serverError = function (m) {
    console.log(m.title);
}

// Send message to other clients
Client.prototype.sendMessage = function (m) {
    let message = {
        exp: this.data.id,
        data: m,
    };
    this.socket.emit('message', message);
}

// Get server informations
Client.prototype.getServerInformation = function () {
    this.socket.emit('get_server_information');
}

var client = new Client();