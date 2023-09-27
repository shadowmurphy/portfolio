const { Telegraf, session, Markup } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const { logger, folderLoader, createJsonBase } = require("telegraf-tools")(bot);
const fs = require("fs")

createJsonBase()

const { JsonBase, Users } = bot.context.jsonbase

bot.context.users = new Users(() => ({
    is_admin: false,
    is_verifed: false,
    is_ignored: false
}))
bot.context.settings = new JsonBase("settings", {
    password: `muf6vUaZ#bW$UY7XrkA574@xqj6U&UcSSoLsqdpD`
})

bot
.use(session())
.use((ctx, next) => {
    if (!ctx.from) return;
    ctx.user = ctx.users.get(ctx.from, true)
    if (ctx.user.is_ignored) return ctx.send("You have been blocked for entering your password incorrectly.")
    return next()
})
.use(require("./tools/stage")(bot.context))
folderLoader("utils")
folderLoader("src")

const timestamp = new Date().toLocaleTimeString()

bot
.launch({ dropPendingUpdates: true })
.then(logger.log(`${timestamp} \x1b[90m[\x1b[0m\x1b[31mINFO\x1b[90m] Bot Started!`, {
    green: "Bot Started!",
    dim: timestamp
}));