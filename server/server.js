var   express = require("express")
    , bodyParser = require('body-parser')
    , app = express()
    , apisRouter = require('./routers/apisRouter')
    , applicationsRouter = require('./routers/applicationsRouter')
    , tenantsRouter = require('./routers/tenantsRouter')
    , usersRouter = require('./routers/usersRouter');
    
app.use(bodyParser.json());

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

app.use('/v1/apis', apisRouter);
app.use('/v1/applications', applicationsRouter);
app.use('/v1/tenants', tenantsRouter);
app.use('/v1/users', usersRouter);

exports = module.exports = server;