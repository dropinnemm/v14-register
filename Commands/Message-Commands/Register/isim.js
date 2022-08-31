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
        name: ["isim","isimdeğiştir"],
        desc: "İsim",
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

        if(!üye){
    const embed = new EmbedBuilder() 
    .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
    .setDescription(cevap.cevaplar.NotMember)
    .setColor(client.redColor())
    .setFooter({text : message.guild.name})
    message.reply({embeds : [embed]})
    return
        }

        if(message.member.id === üye.id) {
            const embed = new EmbedBuilder() 
            .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
            .setDescription(cevap.cevaplar.YouYou)
            .setColor(client.redColor())
            .setFooter({text : message.guild.name})
            message.reply({embeds : [embed]})
            return
        }

        if(!üye.manageable) 
        {
            const embed = new EmbedBuilder() 
            .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
            .setDescription(cevap.cevaplar.Manageable)
            .setColor(client.redColor())
            .setFooter({text : message.guild.name})
            message.reply({embeds : [embed]})
            return
        }
         if(message.member.roles.highest.position <= üye.roles.highest.position) {
            const embed = new EmbedBuilder() 
            .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
            .setDescription(cevap.cevaplar.Highest)
            .setColor(client.redColor())
            .setFooter({text : message.guild.name})
            message.reply({embeds : [embed]})
            return
        }
        args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
        if(!isim && !yaş) {
            const embed = new EmbedBuilder() 
            .setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true ,size : 4096})})
            .setDescription(cevap.cevaplar.NotNameAndAge)
            .setColor(client.redColor())
            .setFooter({text : message.guild.name})
            message.reply({embeds : [embed]})
            return
        }
     
        let isimfln = `${settings.tag} ${isim} ' ${yaş}`
        if(isimfln.length > 32) {
        return message.reply({content : `İsim çok uzun.`})} else{
        üye.setNickname(`${settings.tag} ${isim} ' ${yaş}`) }

        const data = await isimler.findOne({ guildID: message.guild.id, userID: üye.user.id });
       const embed = new EmbedBuilder()
        .setDescription(`
        ${üye}, Üyesinin sunucu ismi \`${settings.tag} ${isim} ' ${yaş}\` olarak değiştirildi

        üyenin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
        ${data ? data.names.splice(0, 3).map((x, i) => `\`${x.name}\` (${x.rol})`).join("\n") : "Daha önce kayıt olmamış."}`)
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL({dynamic : true})})
        .setColor(client.redColor())
     
        const msg = await message.reply({embeds : [embed]})

        
        await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: üye.user.id }, { $push: { names: { name: üye.displayName, yetkili: message.author.id, rol: "İsim Değişikliği", date: Date.now() } } }, { upsert: true });
            

    }}