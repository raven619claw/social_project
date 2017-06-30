import Utils from '../../helpers/scripts/utils.js';

let template = require('../views/template');
let messageTemplate = require('../views/message.marko');
let typingTemplate = require('../views/typing.marko');
let socket = io.connect(Utils.BASE_URL);
let SELECTORS = {
    MSG_CONTENT: '.js-msgContent',
    MSG_INPUT: '.js-msgInput',
    SEND_BTN: '.js-sendBtn',
    USERID: 'header',
    TYPING_EL: '.js-typing',
    CHAT_USERNAME_EL: '.js-username',
    CLOSE_CHAT: '.js-closeChat',
    CHAT_PARENT: '.js-chatBox'

};
let CLASSNAMES = {
    TOGGLE_CHAT: 'inactive'
}
socket.init = function(el, config) {

    if (Utils.isLoggedIn()) {
        console.log('chat module init');
        socket.render(el, config);
        socket.bindChatEvents(el);

    } else {
        console.log('chat module not init');
    }
};
socket.render = function(el, config) {
    template.renderSync(config).replaceChildrenOf(el);
};
socket.bindChatEvents = function(el) {

    socket.on('chatMsg', function(data) {
        socket.updateMessages(data);
    });
    socket.on('typing', function(data) {
        socket.showTyping(data);
    });
    $(el).find(SELECTORS.MSG_INPUT).on('keyup', function(e) {
        if (e.which == 13) {
            socket.sendMsg(el);
        } else if ($(el).find(SELECTORS.MSG_INPUT).val()) {
            $(el).find(SELECTORS.MSG_INPUT).removeClass('is-danger');
            socket.emitActions('typing', $(el).find(SELECTORS.MSG_INPUT).val());
        }
    });
    $(el).find(SELECTORS.SEND_BTN).on('click', function() {
        socket.sendMsg(el);
    });
    $(el).find(SELECTORS.CLOSE_CHAT).on('click', function() {
        $(SELECTORS.CHAT_PARENT).toggleClass(CLASSNAMES.TOGGLE_CHAT);
    });
};
socket.sendMsg = function(el) {
    if ($(el).find(SELECTORS.MSG_INPUT).val()) {
        $(el).find(SELECTORS.MSG_INPUT).removeClass('is-danger');
        socket.emitActions('msg', $(el).find(SELECTORS.MSG_INPUT).val());
        $(el).find(SELECTORS.MSG_INPUT).val('');
    } else {
        $(el).find(SELECTORS.MSG_INPUT).addClass('is-danger');
        setTimeout(() => {
            $(el).find(SELECTORS.MSG_INPUT).removeClass('is-danger');
        }, 1000);
    }
};
socket.emitActions = function(type, data) {
    switch (type) {
        case 'msg':
            socket.emit('chatMsg', {
                userid: $(SELECTORS.USERID).data('userid'),
                msg: data
            });
            break;
        case 'typing':
            socket.emit('typing', {
                userid: $(SELECTORS.USERID).data('userid'),
                username: $(SELECTORS.USERID).data('username')
            });
            break;

    };
};
socket.showTyping = function(data) {
    let html = typingTemplate.renderSync({
        username: data.username
    });
    html.replaceChildrenOf($(SELECTORS.CHAT_USERNAME_EL).get(0));
    setTimeout(() => {
        $(SELECTORS.CHAT_USERNAME_EL).html('user');
    }, 1000);
};
socket.updateMessages = function(data) {
    let html = messageTemplate.renderSync({
        message: data.msg,
        source: $(SELECTORS.USERID).data('userid') == data.userid ? 'me' : 'them'
    });
    html.appendTo($(SELECTORS.MSG_CONTENT).get(0));
    $(SELECTORS.MSG_CONTENT).animate({
        scrollTop: $(SELECTORS["MSG_CONTENT"]).prop("scrollHeight")
    }, 200);
};
module.exports = socket;
