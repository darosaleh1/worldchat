const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  translations: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

const translationModel = mongoose.model("Translation", translationSchema);

module.exports = translationModel;
