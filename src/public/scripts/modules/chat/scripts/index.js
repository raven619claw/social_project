import Utils from '../../helpers/scripts/utils.js';

let template = require('../views/template');
let messageTemplate = require('../views/message.marko');
let typingTemplate = require('../views/typing.marko');
let socketWrapper = {};
socketWrapper.userStore = {};
window.socket = {};
let SELECTORS = {
    MSG_CONTENT: '.js-msgContent',
    MSG_INPUT: '.js-msgInput',
    SEND_BTN: '.js-sendBtn',
    USERID: '.js-userDetails',
    TYPING_EL: '.js-typing',
    CLOSE_CHAT: '.js-closeChat',
    CHAT_PARENT: '.js-chatBox'

};
let CLASSNAMES = {
    TOGGLE_CHAT: 'inactive'
}


socketWrapper.init = function() {
    if (Utils.isLoggedIn()) {
        socket = io.connect(Utils.BASE_URL, { query: 'userid=' + $(SELECTORS.USERID).data('userid') });
        socketWrapper.bindSocketEvents();
        console.log('chat module init');
    } else {
        console.log('chat module not init');
    }
};
socketWrapper.render = function(el, config) {
    template.renderSync(config).replaceChildrenOf(el);
};
socketWrapper.getChatUser = function(el) {
    return $(el).data('chatuserid');
};
socketWrapper.getChatEl = function(el) {
    return $(el).data('roomId');
};
socketWrapper.bindSocketEvents = function() {
    socket.on('chatMsg', function(data) {
        if (!$('body').find(`.js-chatWrapper .js-chat-${data.roomId}`).length) {
            socketWrapper.setupChat(data);
        }
        socketWrapper.updateMessages(data);
    });
    socket.on('typing', function(data) {
        if ($('body').find(`.js-chatWrapper .js-chat-${data.roomId}`).length) {
            socketWrapper.showTyping(data);
        }
    });
    socket.on('chatInitServer', function(data) {
        socketWrapper.setupChat(data);

    });
};

socketWrapper.bindChatEvents = function(el) {

    $(el).find(SELECTORS.MSG_INPUT).on('keyup', function(e) {
        if (e.which == 13) {
            socketWrapper.sendMsg(el);
        } else if ($(el).find(SELECTORS.MSG_INPUT).val()) {
            $(el).find(SELECTORS.MSG_INPUT).removeClass('is-danger');
            socketWrapper.emitActions(el, 'typing', $(el).find(SELECTORS.MSG_INPUT).val());
        }
    });
    $(el).find(SELECTORS.SEND_BTN).on('click', function() {
        socketWrapper.sendMsg(el);
    });
    $(el).find(SELECTORS.CLOSE_CHAT).on('click', function() {
        $(el).find(SELECTORS.CHAT_PARENT).toggleClass(CLASSNAMES.TOGGLE_CHAT);
    });
};
socketWrapper.sendMsg = function(el) {
    if ($(el).find(SELECTORS.MSG_INPUT).val()) {
        $(el).find(SELECTORS.MSG_INPUT).removeClass('is-danger');
        socketWrapper.emitActions(el, 'msg', $(el).find(SELECTORS.MSG_INPUT).val());
        $(el).find(SELECTORS.MSG_INPUT).val('');
    } else {
        $(el).find(SELECTORS.MSG_INPUT).addClass('is-danger');
        setTimeout(() => {
            $(el).find(SELECTORS.MSG_INPUT).removeClass('is-danger');
        }, 1000);
    }
};
socketWrapper.emitActions = function(el, type, data) {
    switch (type) {
        case 'msg':
            socket.emit('chatMsg', {
                messages: [{
                    content: {
                        media: [],
                        text: data
                    },
                    author: {
                        id: $(SELECTORS.USERID).data('userid'),
                        name: $(SELECTORS.USERID).data('username')
                    },
                    timestamp: new Date().getTime(),
                    readFlag: []

                }],
                roomId: socketWrapper.getChatEl(el),
                origin: $(el).data('origin')
            });
            break;
        case 'typing':
            socket.emit('typing', {
                username: $(SELECTORS.USERID).data('username'),
                roomId: socketWrapper.getChatEl(el)
            });
            break;

    };
};
socketWrapper.showTyping = function(data) {
    let el = $(`.js-chat-${data.roomId}`).get(0)
    let html = typingTemplate.renderSync({});
    html.replaceChildrenOf($(el).find(SELECTORS.TYPING_EL).get(0));
    setTimeout(() => {
        $(el).find(SELECTORS.TYPING_EL).html('');
    }, 1000);
};
socketWrapper.updateMessages = function(data) {
    let el = $(`.js-chat-${data.roomId}`).get(0)
    if (!data.messages) {
        return
    }
    data.messages.forEach((message) => {
        let html = messageTemplate.renderSync({
            message: message.content.text,
            source: $(SELECTORS.USERID).data('userid') == message.author.id ? 'me' : 'them'
        });
        html.appendTo($(el).find(SELECTORS.MSG_CONTENT).get(0));
    })

    $(el).find(SELECTORS.MSG_CONTENT).animate({
        scrollTop: $(el).find(SELECTORS["MSG_CONTENT"]).prop("scrollHeight")
    }, 200);
};

$('body').on('click', '.js-open-chat', function(e) {
    socket.emit('chatInitClient', {
        users: [$(SELECTORS.USERID).data('userid'), $(this).data('chatuserid')],
        origin: true,
        origin_user: $(SELECTORS.USERID).data('userid'),
        chat_username: $(this).data('chatusername')
    });
});

socketWrapper.setupChat = function(data) {
    let roomId;
    roomId = data.roomId;

    if (!$('body').find(`.js-chatWrapper .js-chat-${roomId}`).length) {
        $('body').find(`.js-chatWrapper`).append(`<div class='js-chat-${roomId}'></div>`);
        $(`.js-chat-${roomId}`).data('roomId', roomId)
    }

    socketWrapper.render($(`.js-chat-${roomId}`).get(0), { roomId: roomId, chat_username: data.chat_username });
    socketWrapper.bindChatEvents($(`.js-chat-${roomId}`).get(0));
}
module.exports = socketWrapper;