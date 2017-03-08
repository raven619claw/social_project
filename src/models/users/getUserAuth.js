const GLOBALCONSTANTS = require('../../config/constants');
const dbSession = require('../../services/neo4jConnector');
let dataObject = {};
dataObject.getUserAuth = (userData) => {
    return new Promise((resolve, reject) => {
        let queryString = "MATCH (node1:USER {name:{name}}) OPTIONAL MATCH (node2:USER) WHERE  node2.name=node1.name AND node2.password={password} RETURN node2";
        let queryParameters = { name: userData.username, password: userData.password };
        GLOBALCONSTANTS.LOGGER.LOG('info','dB query for user auth running')
        GLOBALCONSTANTS.LOGGER.LOG('data', 'dB query run: ' + queryString + ' with parameters: '+JSON.stringify(queryParameters));
        dbSession
            .run(queryString, queryParameters)
            .then(function(result) {
                GLOBALCONSTANTS.LOGGER.LOG('data','dB query for user auth successfully done\n result:'+JSON.stringify(result));
                    dbSession.close();
                    if (result.records[0]){
                        if(result.records[0]._fields[0]){
                            resolve({user:userData,loginStatus:{user:true,password:true}})
                        }
                        else{
                            resolve({user:userData,loginStatus:{user:true,password:false}})
                        }
                    }else{
                        resolve({user:userData,loginStatus:{user:false,password:false}});
                    }
                },
                function(err) {
                    GLOBALCONSTANTS.LOGGER.LOG('error','dB query for user auth failed\n result:'+JSON.stringify(err));
                    dbSession.close();
                    reject(false);
                });
    });
};

module.exports = dataObject;
