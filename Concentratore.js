exports.concentratore = (function(io, mongoose){
                var critical = 1;
                var warning = 2;
                var informational = 3;

                var Schema = mongoose.Schema;
                var eccezioneSchema = new Schema({
                        'mittente': { type: String, index: true },
                        'messaggio': String
                        });
                var eccezioneModel= mongoose.model('eccezioneModel', eccezioneSchema);

                function handleEccezione(messaggio, mittente){
                var newEccezione = new eccezioneModel({
                        mittente: mittente,
                        messaggio: messaggio
                        });
                newEccezione.save(function (err) {
                        console.log("conc. sockets" + io.sockets.length);
                        io.sockets.emit('eccezioneGestitaEvent', { Mittente: mittente, Messaggio: messaggio });
                        });
                }
                return {
                        getEccezione: handleEccezione
                };
});
