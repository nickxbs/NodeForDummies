var Comune;
function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  /**
    * Model: Comune
    */
  Comune = new Schema({
    'descrizione': { type: String, index: true },
    'provincia': String
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