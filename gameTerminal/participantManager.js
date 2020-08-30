/* eslint-disable default-case */
const { message } = require('../constants');

function handle(app, msg) {
    let participants = { ...app.participants };
    switch (msg.type) {
    case message.INIT:
        participants = {};
        break;
    case message.LOCALPLAY:
        participants = {
            player: participants.player,
            guest: null,
        };
        break;
    case message.NETWORKPLAY:
        participants = {
            player: participants.player,
        };
        break;
    case message.LOGIN:
        participants.player = msg.account;
        break;
    case message.OPPONENT:
        participants.guest = msg.account;
        break;
    }
    return participants;
}

exports.handle = handle;
