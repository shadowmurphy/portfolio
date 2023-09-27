const { Markup, session } = require("telegraf");

const basic_options = { parse_mode: 'HTML', disable_web_page_preview: true };

module.exports = (bot) => {
    Object.assign(bot.context, {
        send: async function(text, extra={}) {
            const chat_id = extra.chat_id || this.chat.id;
            delete extra.chat_id;
            return this.telegram.sendMessage(chat_id, text, Object.assign(extra, basic_options));
        },

        genMention: function(user){
			const { first_name, last_name, id, username } = user ?? this.from;
			return username ? `@${username}` : `<a href='tg://user?id=${id}'>${first_name + (last_name ? ' ' + last_name : '')}</a>`
		},

        edit: async function(text, extra = {}){
			const chat_id = extra.chat_id || this.chat.id;
			const message_id = extra.message_id || this.callbackQuery.message.message_id
			delete extra.chat_id;
			delete extra.message_id;
			return this.telegram.editMessageText(chat_id, message_id, null, text, Object.assign(extra, basic_options));
		},
        start: function() {
            this.send("Admin Panel", Markup.inlineKeyboard([
                [Markup.button.callback("➕ Add work", "add-work")]
            ]))
        }
    })
}