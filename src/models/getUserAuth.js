let userAuth = {};
userAuth.getUser = (dbSession, userData) => {

    return new Promise((resolve, reject) => {
        dbSession
            .run("MATCH (user:USER) WHERE user.name={name} AND user.password={password} RETURN user", { name: userData.name, password: userData.password })
            .then(function(result) {
                    console.log('query success');
                    dbSession.close();
                    if (result.records[0] && result.records[0]._fields[0].properties)
                    	resolve(result.records[0]._fields[0].properties)
                    resolve(false);
                },
                function(err) {
                    console.log('query failed');
                    dbSession.close();
                    return false;
                });
    });
};

module.exports = userAuth;
