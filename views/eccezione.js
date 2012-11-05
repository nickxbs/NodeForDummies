var socket = io.connect('http://localhost:3000');
socket.on('eccezioneGestitaEvent', function (data) {
		window.location.reload();  
		});
