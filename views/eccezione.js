
var socket = io.connect(location.origin);
socket.on('eccezioneGestitaEvent', function (data) {
		window.location.reload();  
		});
