exports.concentratore = (function(sock, mongoose){
                var critical = 1;
                var warning = 2;
                var informational = 3;

                var Schema = mongoose.Schema;
                var eccezioneSchema = new Schema({
                        'mittente': { type: String, index: true },
                        'messaggio': String
                        });
                var eccezioneModel= mongoose.model('eccezioneModel', eccezioneSchema);

                console.log("Prova concentratore");
                function handleEccezione(messaggio, mittente){
                var newEccezione = new eccezioneModel({
                        mittente: mittente,
                        messaggio: messaggio
                        });
                newEccezione.save(function (err) {
                        if (err)
                        console.log(err);                        
                        notificaEccezioneGestita();
                        });
}
function notificaEccezioneGestita(){
        sock.sockets.on('connection', function (s) {
                        s.emit('eccezioneGestitaEvent', { data: 'ok' });
                        });
}
return {
getEccezione: handleEccezione
};
});
