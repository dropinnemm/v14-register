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
        name: ["k","e","erkek","man","kadın","woman"],
        desc: "Kayıt",
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
        var erkek = randomstring({length: 20});
        var woman = randomstring({length: 20});
        var iptal = randomstring({length: 20});
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(erkek)
            .setEmoji(emojiler.man)
            .setLabel("Erkek")
            .setStyle(1)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(woman)
            .setEmoji(emojiler.woman)
            .setLabel("Kadın")
            .setStyle(3)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(iptal)
            .setEmoji(emojiler.red)
            .setLabel("İptal")
            .setStyle(4)
        )
        const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(erkek)
            .setEmoji(emojiler.man)
            .setLabel("Erkek")
            .setStyle(1)
            .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(woman)
            .setEmoji(emojiler.woman)
            .setLabel("Kadın")
            .setStyle(3)
            .setDisabled(true)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(iptal)
            .setEmoji(emojiler.red)
            .setLabel("İptal")
            .setStyle(4)
            .setDisabled(true)
        )
        let isimfln = `${settings.tag} ${isim} ' ${yaş}`
        if(isimfln.length > 32) {
        return message.reply({content : `İsim çok uzun.`})} else{
        üye.setNickname(`${settings.tag} ${isim} ' ${yaş}`) }

        const data = await isimler.findOne({ guildID: message.guild.id, userID: üye.user.id });
        const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });
        const embed = new EmbedBuilder()
        .setDescription(`
        ${üye}, Üyesinin sunucu ismi \`${settings.tag} ${isim} ' ${yaş}\` olarak değiştirildi

        üyenin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
        ${data ? data.names.splice(0, 3).map((x, i) => `\`${x.name}\` (${x.rol})`).join("\n") : "Daha önce kayıt olmamış."}`)
        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.displayAvatarURL({dynamic : true})})
        .setColor(client.redColor())
        .setFooter({ text: "lütfen 30 saniye içinde seçimiinizi yapın."});
        const msg = await message.reply({embeds : [embed] ,components : [row]})


    
        const collector = message.channel.createMessageComponentCollector({ time: 30000 });

        collector.on('collect', async button => {
            if (button.customId === erkek) {
          if(button.member.id != message.member.id) return
                const embed = new EmbedBuilder()
                .setDescription(`${üye}, üyesinin ismi \`${settings.tag} ${isim} ${yaş}\` olarak değiştirildi \n ${roller.ManRoles.length > 1 ? roller.ManRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + roller.ManRoles.map(x => `<@&${x}>`).slice(-1) : roller.ManRoles.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi.`)
                .setAuthor({ name: üye.user.username, iconURL: üye.user.displayAvatarURL({dynamic : true})})
                .setColor(client.blueColor())
                .setFooter({ text: `• Toplam kayıt: ${datas ? datas.top : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • Kadın kayıt : ${datas ? datas.kız : 0}`}); 
                await üye.roles.add(roller.ManRoles)
                await üye.roles.remove(roller.WomanRoles)
                await üye.roles.remove(roller.UnRegRoles)
                await button.reply({ embeds: [ embed ], ephemeral: true });
                await toplam.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: üye.user.id } }, { upsert: true });
                await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
                await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: üye.user.id }, { $push: { names: { name: üye.displayName, yetkili: message.author.id, rol: roller.ManRoles.map(x => `<@&${x}>`).join(" , "), date:Date.now() } } }, { upsert: true });
                await msg.edit({components : [row2]})
                
            }
            if (button.customId === woman) {
                if(button.member.id != message.member.id) return
                      const embed = new EmbedBuilder()
                      .setDescription(`${üye}, üyesinin ismi \`${settings.tag} ${isim} ${yaş}\` olarak değiştirildi \n ${roller.WomanRoles.length > 1 ? roller.WomanRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + roller.WomanRoles.map(x => `<@&${x}>`).slice(-1) : roller.WomanRoles.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi.`)
                      .setAuthor({ name: üye.user.username, iconURL: üye.user.displayAvatarURL({dynamic : true})})
                      .setColor(client.pinkColor())
                      .setFooter({ text: `• Toplam kayıt: ${datas ? datas.top : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • Kadın kayıt : ${datas ? datas.kız : 0}`}); 
                      await üye.roles.add(roller.WomanRoles)
                      await üye.roles.remove(roller.ManRoles)
                      await üye.roles.remove(roller.UnRegRoles)
                      await button.reply({ embeds: [ embed ], ephemeral: true });
                      await toplam.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: üye.user.id } }, { upsert: true });
                      await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
                      await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: üye.user.id }, { $push: { names: { name: üye.displayName, yetkili: message.author.id,  rol: roller.WomanRoles.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
                       await msg.edit({components : [row2]})
                  }
                  if (button.customId === iptal) {
                    if(button.member.id != message.member.id) return
                    await üye.setNickname(`${settings.tag} İsim ' Yaş`) 
                    await msg.edit({components : [row2]})
                    await üye.roles.add(roller.UnRegRoles)
                    await üye.roles.remove(roller.ManRoles)
                    await üye.roles.remove(roller.WomanRoles)
                    await button.reply({ content:`${emojiler.onay} İşlem iptal edildi.`, ephemeral: true });
                     

                }
        })
    }}