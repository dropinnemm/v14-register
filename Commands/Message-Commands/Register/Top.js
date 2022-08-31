const {discord, EmbedBuilder,AttachmentBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,ApplicationCommandPermissionsManager  } = require("discord.js")
const cevap = require("../../../Config/cevaplar")
const rol = require("../../../Config/roller")
const emojiler = require("../../../Config/emojiler")
const settings = require("../../../Config/settings")
const randomstring = require("random-string")

const isimler = require("../../../schemas/isimler")
const regstats = require("../../../schemas/registerStats");
const toplam = require("../../../schemas/toplam");
const roller = require("../../../Config/roller")

module.exports = {
    command: {
        name: ["rtop","registertop"],
        desc: "Resgister Top",
        category: "Register",
    },
    async run({ client, message, args }) {
        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
 
        if(!message.member.roles.cache.has(rol.roller.RegPerm) && !message.member.roles.cache.has(rol.roller.Owner) && !message.member.roles.cache.has(rol.roller.Owner2) && !message.member.roles.cache.has(rol.roller.Ceo) && !message.member.roles.cache.has(rol.roller.PANKART) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)){  
            const embed = new EmbedBuilder() 
            .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
            .setDescription(cevap.cevaplar.NotRegPerm)
            .setColor(client.redColor())
            .setThumbnail(message.member.user.displayAvatarURL({dynamic : true , size : 4096}))
            .setFooter({text : message.guild.name})
            message.reply({embeds : [embed]})
            return
        }

          
        let registerTop = await regstats.find({ guildID: message.guild.id }).sort({ top: -1 });

        if (!registerTop.length) 
        {
        message.reply({content : "Herhangi bir kayıt verisi bulunamadı!"})
        return }

      
        const embed = new EmbedBuilder()
        .setDescription(`${registerTop.map((x, i) => `\`${i + 1}.\` <@${x.userID}> - Erkek \`${x.erkek}\` Kadın \`${x.kız}\``)}`) .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL({dynamic : true})})
        .setColor(client.redColor())
     
        const msg = await message.reply({embeds : [embed]})
    }}