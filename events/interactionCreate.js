
    const { ActionRowBuilder, TextInputBuilder, InteractionType, EmbedBuilder, resolveColor, Embed} = require("discord.js");
    module.exports = {
        name: 'interactionCreate',
        async run(client, interaction) {
            if (!interaction.type === InteractionType.ApplicationCommand) return;

            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.run(interaction)
            } catch (error) {
                if (error) {
                console.log(error)
            }
        }
        },
    };