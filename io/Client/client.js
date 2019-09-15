function Client() {
    // Define socket
    var socket = io.connect('http://localhost:8080');

    // Receive server validation
    socket.on('server', function(message) {
        console.log('Le serveur a un message pour vous : ' + message);
    })
}




var client = new Client();