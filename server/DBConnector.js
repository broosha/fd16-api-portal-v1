var mongoose = require("mongoose");
   
var DBConnector = function()
{
    
    //connect mongodb/mongoose

    mongo_server = process.env.CR_MONGODB_PORT_27017_TCP_ADDR || 'localhost';

    mongoose.connect('mongodb://' + mongo_server + ':27017/cr', function(err) {
        if(err) {
            if(err.message == "Trying to open unclosed connection.")
            {
                console.log('tryed to open unclosed connection. ignoring error');
            }
            else
            {
                console.log('db connection error', err);
                throw "failed to connect to db";
            }
        } else {
            console.log('db connection successful');

        }
    });
    
    this.Applications = require('./models/applicationsModel');
    
};

module.exports = DBConnector;