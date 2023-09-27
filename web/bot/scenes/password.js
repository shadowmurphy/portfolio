const { Scenes: { WizardScene }, Composer, Telegraf, session, Markup } = require('telegraf');
const MAX_ATTEMPTS = 3; 

module.exports = (base_ctx) => {

  let attempts = 1;

  const handlerText = Telegraf.on("text", async ctx => {
      if (attempts >= MAX_ATTEMPTS) {
          ctx.scene.leave();
          ctx.user.edit("is_ignored", true);
          return ctx.send("You've wasted your last attempt, try again in 24 hours.");
      }
      const isValidPassword = ctx.message.text === ctx.settings.body.password; 
      if (!isValidPassword) {
          attempts++;
          return ctx.send(`The password is entered incorrectly.\nYou have: ${MAX_ATTEMPTS - attempts} attempts left`);
      }
      ctx.user.edit("is_verifed", true);
      ctx.send("The password is entered correctly, you have been granted access!");
  });

    const scene = new WizardScene(
        "password",
        handlerText
      );
    
    scene.enter(async ctx => {
      ctx.edit("Enter a password:")
    })
    return scene;
}