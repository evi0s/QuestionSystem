module.exports = init;

const user = require('../bin/user');

function init(app,directory){
    app.get('/user/:userID/name',function(req,res){
        var userID = req.params['userID'];

        user.getUsernameByID(userID,function(result){
            res.send(result);
        });
    });

}

