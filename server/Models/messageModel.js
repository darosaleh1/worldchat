const mongoose = require("mongoose")
const translationModel = require("../Models/translationModel")

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String
},
{
    timestamps: true
});

messageSchema.post('save', function(doc, next){
    
    translationModel.create({ messageId: doc._id, translations: {} })
    .then(() => next())
    .catch(err => next(err));
});

const messageModel = mongoose.model("Message", messageSchema)

module.exports = messageModel;