 var socket = io.connect('http://localhost:3000');
  socket.on('eccezioneGestitaEvent', function (data) {
    console.log(data);
	window.location.reload();  
  });
