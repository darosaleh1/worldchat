const translationModel = require("../Models/translationModel")
const {translateText} = require("../google_translate")




//  check db for translation else create translation and update translation object
const handleTranslation = async (req, res) => {
    const { messageId, text, targetLanguage } = req.body;
  
    try {
      // Attempt to retrieve the existing translation for the messageId and targetLanguage
      const existingTranslationDoc = await translationModel.findOne({ messageId: messageId });
      const existingTranslation = existingTranslationDoc ? existingTranslationDoc.translations.get(targetLanguage) : null;
  
      if (existingTranslation) {
        // Translation already exists, so return it
        res.json({ success: true, translatedText: existingTranslation, message: "Translation fetched from database." });
      } else {
        // Translation doesn't exist, perform translation
        const translatedText = await translateText(text, targetLanguage);
        if (!translatedText || translatedText === 0) {
          // Handle failure in translation
          return res.status(500).json({ success: false, message: 'Failed to translate message.' });
        }
  
        // Update or insert the translation in the database
        const update = { $set: { [`translations.${targetLanguage}`]: translatedText } };
        const updatedTranslationDoc = await translationModel.findOneAndUpdate(
          { messageId: messageId },
          update,
          { new: true, upsert: true }
        );
  
        res.json({ success: true, translatedText: translatedText, message: "Translation performed and saved." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error processing translation request.' });
    }
  };


module.exports = {handleTranslation}


