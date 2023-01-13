const mongoose = require('mongoose');

const mongoDB =
    "mongodb+srv://Hosh:Bearbrick2@cluster0.e2dla.mongodb.net/helmutsiteDB";
  

mongoose.set('strictQuery', false);

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });



mongoose.connection.once('open', () => {
    console.log('Connected To MongoDb');
})



module.exports = mongoose.connection
