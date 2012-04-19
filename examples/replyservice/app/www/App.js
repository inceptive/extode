// Quick and simple example of a full stack
// Node.JS app fully served by node and socket.io
var socket, responseWindow;

function initApp() {

    // Connect to the service on load
    socket = io.connect('http://localhost:9998/');
    responseWindow = document.getElementById('responseWindow');

    // Register a callback
    socket.on('sendmessage', function(payload) {
        responseWindow.innerHTML = payload.message + "<br />" + responseWindow.innerHTML;
    });
}

// On button click, call this function 
function sendAndReceiveMessage() {

    var messageToSend = prompt("Enter a message to send:");
    
    // Send the message
    socket.emit('sendmessage', {
        message: messageToSend
    });
}


// Do a performance test
function performanceTest() {
    var i, msg = 'A test dummy';
    for (i=0; i<=500; i++) {
        socket.emit('sendmessage', {
            message: i + ": " + msg
        });
    }
}