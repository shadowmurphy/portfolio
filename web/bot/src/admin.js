const { Markup } = require("telegraf")

module.exports = (bot) => {
    bot
    .action("add-work", async ctx => {
        await ctx.deleteMessage()
        ctx.session.msg = (await ctx.send("Use the buttons below to add new work to your portfolio", Markup.inlineKeyboard([
            [Markup.button.callback("➕ Add title", "add-title")],
            [Markup.button.callback("➕ Add text", "add-text")],
            [Markup.button.callback("➕ Add img", "add-img")],
            [Markup.button.callback("➕ Add code", "add-code")],
            [Markup.button.callback("➕ Add GitHub", "add-git")],
            [Markup.button.callback("ㅤ", "skip")],
            [Markup.button.callback("🖥 Publish", "publish")]
        ]))).message_id
    })

    .action("skip", ctx => ctx.answerCbQuery())
}