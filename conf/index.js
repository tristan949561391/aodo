/**
 * Created by Tristan on 17/3/19.
 */
module.exports.SERVER = {
    port: 3000
};

module.exports.MONGODB = {
    url: 'mongodb://moondust.cc/auth',
    options: {
        // db: {native_parser: true},
        // server: {poolSize: 5},
        // replset: {rs_name: 'myReplicaSetName'},
        // user: 'myUserName',
        // pass: 'myPassword'
    }
};

module.exports.REDIS = {
    host: 'localhost',
    port: 6379,
    options: {}
};
