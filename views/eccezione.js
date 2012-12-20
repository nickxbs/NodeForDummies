
var socket = io.connect(location.origin);
socket.on('eccezioneGestitaEvent', function (data) {
$('#tab > tbody:last').append('<tr><td>'+data.Mittente+'</td><td>'+data.Messaggio+'</td></tr>');		});
