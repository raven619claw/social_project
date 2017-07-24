const _ = require('lodash');

const GLOBALCONSTANTS = require('../config/constants');
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = GLOBALCONSTANTS.APPCONFIG.MONGO_DB_URL;;
let dataObject = {};


dataObject.getChat = function(chatId) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        mongoSession.then((db) => {
            resolve(db.collection('chatData').find({
                chatId: chatId
            }).toArray());
            db.close();
        });
    });
};
dataObject.addChat = function(chatObject) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        let defaultChatObject = {
            chatId: '',
            roomId: '',
            users: [],
            deletedForUsers: []
        };
        _.assign(defaultChatObject, chatObject);
        mongoSession.then((db) => {
            db.collection('chatData').insertOne(defaultChatObject);
            db.close();
            resolve([defaultChatObject], true);
        }).catch((error) => {});
    });
};

dataObject.addMessages = function(chatId, msgArray) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        let messagesArray = [];
        msgArray.forEach((msgObject) => {
            //ask why
            let defaultMsgObject = {
                id: '',
                content: {
                    media: [],
                    text: ''
                },
                author: {
                    id: '',
                    name: ''
                },
                timestamp: '',
                readFlag: []
            };
            _.assign(defaultMsgObject, msgObject);
            messagesArray.push(defaultMsgObject);
        });
        mongoSession.then((db) => {
            db.collection('chatData').update({ chatId: chatId }, {
                $push: {
                    messages: {
                        $each: messagesArray
                    }
                }
            });
            db.close();
            resolve(true);
        });
    });
};

dataObject.addUsersToChat = function(chatId, userArray) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        mongoSession.then((db) => {
            db.collection('chatData').update({ chatId: chatId }, {
                $push: {
                    users: {
                        $each: userArray
                    }
                }
            });
            db.close();
            resolve(true);
        });
    });
};

dataObject.removeUsersFromChat = function(chatId, userArray) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        mongoSession.then((db) => {
            db.collection('chatData').update({ chatId: chatId }, {
                $pull: {
                    users: {
                        $in: userArray
                    }
                }
            });
            db.close();
            resolve(true);
        });
    });
};

dataObject.updateRoomId = function(chatId, roomId) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        mongoSession.then((db) => {
            db.collection('chatData').update({ chatId: chatId }, {
                $set: {
                    "roomId": roomId
                }
            });
            db.close();
            resolve(true);
        });
    });
};


dataObject.deleteChatForUsers = function(chatId, userArray) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let mongoSession = MongoClient.connect(url);
        mongoSession.then((db) => {
            db.collection('chatData').update({ chatId: chatId }, {
                $push: {
                    deletedForUsers: {
                        $each: userArray
                    }
                }
            });
            db.close();
            resolve(true);
        });
    });
};
let msgTest = [{
    content: {
        text: 'msg1'
    },
    author: {
        id: 'author2',
        name: 'author2123'
    },
    timestamp: '213123',

}, {
    content: {
        text: 'msg2'
    },
    author: {
        id: 'author2',
        name: 'author2123'
    },
    timestamp: '213124'

}];

module.exports = dataObject;