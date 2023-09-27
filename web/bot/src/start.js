const { Markup } = require("telegraf")

module.exports = (bot) => {
    bot
    .start(async ctx => {
        if (!ctx.user.is_verifed) return ctx.send("Access is denied, enter the password to continue working:", Markup.inlineKeyboard([
            [Markup.button.callback("🔐 Log In", "login")]
        ]))
        ctx.start()
    })
    .action("login", ctx => ctx.scene.enter("password"))
}