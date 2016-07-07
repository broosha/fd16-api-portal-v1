var   express = require("express")
    , bodyParser = require('body-parser');
    
var app = express();
app.use(bodyParser.json());

var applicationsRouter = require('./routers/applicationsRouter');

var server;
if(process.env.PORT == undefined || process.env.PORT == null)
{
    server = app.listen(7070, function(){
        console.log('Example app listening on port ' + 7070 + '!');
    });
}
else
{
    server = app.listen(process.env.PORT, function(){
        console.log('Example app listening on port ' + process.env.PORT + '!');
    });
}

app.use('/api/v1/applications', applicationsRouter);

exports = module.exports = server;