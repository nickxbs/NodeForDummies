exports.concentratore = (function(sock, mongoose){
                var critical = 1;
                var warning = 2;
                var informational = 3;

var Schema = mongoose.Schema;
var eccezioneSchema = new Schema({
      'mittente': { type: String, index: true },
      'messaggio': String
  });

                console.log("Prova concentratore");
                function handleEccezione(messaggio, mittente){
                  var newEccezione = new eccezioneSchema({
                        mittente: mittente,
                        messaggio: messaggio
                    });
                    newEccezione.save(function (err) {
                        if (err)
                            console.log(err);
                        res.send('Eccezione inserita');
                        notificaEccezioneGestita();
                    });
                }
                function notificaEccezioneGestita(){
                        sock.emit('eccezioneGestitaEvent', { data: 'ok' });
                }
                return {
                getEccezione: handleEccezione
                };
});
