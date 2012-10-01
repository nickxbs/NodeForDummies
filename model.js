var Comune;
function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  /**
    * Model: Comune
    */
  Asl = new Schema({
      'descrizione': { type: String, index: true },
      'codice': String,
      'distretti': [String]
  });



  Comune = new Schema({
    'descrizione': { type: String, index: true },
    'provincia': String,
    'codiceCOmune': String,
    'cap': [String],
    'codiceIstat': String,
    'asl': [Asl],
    'isSoppresso': Boolean



	});

  Comune.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  Comune.pre('save', function(next) {
    this.keywords = extractKeywords(this.data);
    next();
  });
 
  mongoose.model('Comune', Comune);
  mongoose.model('Asl', Asl);

  fn();
}

exports.defineModels = defineModels; 
 
 
 function extractKeywords(text) {
  if (!text) return [];

  return text.
    split(/\s+/).
    filter(function(v) { return v.length > 2; }).
    filter(function(v, i, a) { return a.lastIndexOf(v) === i; });
}