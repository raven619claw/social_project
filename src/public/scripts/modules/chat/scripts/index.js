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
    return $(el).data('chatel');
};
socketWrapper.bindSocketEvents = function() {
    socket.on('chatMsg', function(data) {
        if (!$('body').find(`.js-chatWrapper .js-chat-${data.chat_el}`).length) {
            socketWrapper.setupChat(data);
        }
        socketWrapper.updateMessages(data);
    });
    socket.on('typing', function(data) {
        if ($('body').find(`.js-chatWrapper .js-chat-${data.chat_el}`).length) {
            socketWrapper.showTyping(data);
        }
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
                source_userid: $(SELECTORS.USERID).data('userid'),
                msg: data,
                destination_userid: socketWrapper.getChatUser(el),
                chat_el: socketWrapper.getChatEl(el),
                source_chat_username: $(SELECTORS.USERID).data('username')
            });
            break;
        case 'typing':
            socket.emit('typing', {
                source_userid: $(SELECTORS.USERID).data('userid'),
                username: $(SELECTORS.USERID).data('username'),
                destination_userid: socketWrapper.getChatUser(el),
                chat_el: socketWrapper.getChatEl(el)
            });
            break;

    };
};
socketWrapper.showTyping = function(data) {
    let el = $(`.js-chat-${data.chat_el}`).get(0)
    let html = typingTemplate.renderSync({});
    html.replaceChildrenOf($(el).find(SELECTORS.TYPING_EL).get(0));
    setTimeout(() => {
        $(el).find(SELECTORS.TYPING_EL).html('');
    }, 1000);
};
socketWrapper.updateMessages = function(data) {
    let el = $(`.js-chat-${data.chat_el}`).get(0)
    let html = messageTemplate.renderSync({
        message: data.msg,
        source: $(SELECTORS.USERID).data('userid') == data.source_userid ? 'me' : 'them'
    });
    html.appendTo($(el).find(SELECTORS.MSG_CONTENT).get(0));
    $(el).find(SELECTORS.MSG_CONTENT).animate({
        scrollTop: $(el).find(SELECTORS["MSG_CONTENT"]).prop("scrollHeight")
    }, 200);
};

$('body').on('click', '.js-open-chat', function(e) {
    socketWrapper.setupChat({ chat_el: $(SELECTORS.USERID).data('userid') + $(this).data('chatuserid'), chatuserid: $(this).data('chatuserid'), chat_username: $(this).data('chatusername') });
});

socketWrapper.setupChat = function(data) {
    let chat_el = data.chat_el;
    let chatuserid = data.chatuserid || data.source_userid;
    let chat_username = data.chat_username || data.source_chat_username;
    if (!$('body').find(`.js-chatWrapper .js-chat-${chat_el}`).length) {
        $('body').find(`.js-chatWrapper`).append(`<div class='js-chat-${chat_el}' data-chatel='${chat_el}' data-chatuserid='${chatuserid}'></div>`);
    }

    socketWrapper.render($(`.js-chat-${chat_el}`).get(0), { chat_el: chat_el, chat_username: chat_username });
    socketWrapper.bindChatEvents($(`.js-chat-${chat_el}`).get(0));
}
module.exports = socketWrapper;
