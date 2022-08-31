const { glob } = require('glob');
const { promisify } = require('util');
const {red, green, blue} = require("chalk")
module.exports = async (client) => {
    const commandss = await promisify(glob)("./Commands/Interaction-Commands/*/*.js");
    const commands = [];
    commandss.map((value) => {
        let file = require(`.${value}`);
        commands.push(file.data.toJSON());
        client.commands.set(file.data.name, file);
        console.log(red(`[BOT SLASH /] `)+ green(`${file.data.name} Komutu başarıyla yüklendi.`))
    });
    client.once('ready', async () => {
        try {
            client.application.commands.set(commands)
            console.log(red(`[BOT SLASH /] `)+ green(`Komutları yüklendi.`))

        } catch (error) {
            console.log(error)
            console.log(red(`[BOT SLASH /] Slash (/) komutları yüklenemedi`))
        }
    });
};
