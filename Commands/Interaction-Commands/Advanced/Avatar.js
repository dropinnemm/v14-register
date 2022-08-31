const { SlashCommandBuilder,AttachmentBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Kullanıcının Avatarını Gösterir!")
        .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Avatarına bakmak istediğiniz üyeyi belirtiniz.")
    ),
        
    async run(interaction) {
        
        const member = interaction.options.getString('user') || interaction.member;
        if (isNaN(member)) {
          return interaction.reply({ content: 'Kullanıcı id si bir sayı olmalıdır.', ephemeral: true });
        }
        try {
          await client.users.fetch(member);
        } catch (e) {
          return interaction.reply({ content: "Böyle bir kullanıcı bulunamadı.", ephemeral: true });
        }
        const üye = await client.users.fetch(member);
        await üye.fetch();
          const attachment = new AttachmentBuilder(üye.displayAvatarURL({dynamic : true , size : 4096}));

        interaction.reply({content : `${üye.tag} \`(${üye.id})\`` , files : [attachment]})
       }
      
      }
        
    