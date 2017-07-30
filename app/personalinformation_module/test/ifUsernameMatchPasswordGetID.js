//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['personalinformation_module'] = (require(directory + './personalinformation_module'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('ifUsernameMatchPasswordGetID',function(){

    before(function(done){
        var deletePersonalInformation = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM PersonalInformation',function(){
                resolve();
            });
        });

        var deleteShadowTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM ShadowTable',function(){
                resolve();
            });
        });

        var insertPersonalInformation = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO ShadowTable (ID,Shadow) VALUE (1,123)',function(){
                resolve();
            });
        });

        var insertShadowTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO PersonalInformation (ID,Name) VALUE (1,"abc")',function(){
                resolve();
            });
        });

        Promise.all([
            deletePersonalInformation,
            deleteShadowTable,
            insertPersonalInformation,
            insertShadowTable
        ]).then(function(){
            done();
        });
    });

    it('correct password and username',function(done){
        config.modules['personalinformation_module'].ifUsernameMatchPasswordGetID('abc',123,function(results){
            expect(results).to.be.a('number');
            expect(results).to.be.equal(1);

            done();
        });
    });

    it('incorrect password and username',function(done){
        config.modules['personalinformation_module'].ifUsernameMatchPasswordGetID('abc',0,function(results){
            expect(results).to.be.a('boolean');
            expect(results).to.be.equal(false);

            done();
        });
    });

});