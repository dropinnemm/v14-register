const {discord, EmbedBuilder,AttachmentBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,ApplicationCommandPermissionsManager, InteractionCollector  } = require("discord.js")

const cevap = require("../../../Config/cevaplar")
const rol = require("../../../Config/roller")
const emojiler = require("../../../Config/emojiler")
const settings = require("../../../Config/settings")
const kanallar = require("../../../Config/kanallar")
const randomstring = require("random-string")

module.exports = {
    command: {
        name: ["gel","yanımagel"],
        desc: "Gel",
        category: "Kullanıcı",
    },
    async run({ client, message, args }) {


        if (!message.member.voice.channelId) return message.reply({content : `${cevap.cevaplar.NotVoiceChannel}`});
        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!üye) return message.reply({content : cevap.cevaplar.NotMember})
        if (!üye.voice.channelId) return message.reply({content : `${cevap.cevaplar.MemberNotVoiceChannel}`});
        if(message.member.voice.channelId === üye.voice.channelId) return message.reply({content : cevap.cevaplar.SameVoiceChannel})
        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
           üye.voice.setChannel(message.member.voice.channelId)
            message.react(emojiler.onay)

            const embed = new EmbedBuilder()
            .setAuthor({name : message.member.user.username , iconURL :  message.member.user.displayAvatarURL({dynamic : true , size : 4096})})
            .setDescription(`
            Bir **transport** işlemi gerçekleşti.
            
            Odaya getirilen kullanıcı : ${üye} - \`${üye.id}\`
            Odasına gidilen kişi : ${message.member} - \`${message.member.user.id}\`
            Kanal : <#${message.member.voice.channelId}>
            `)
            .setFooter({text :  üye.user.username , iconURL : üye.user.displayAvatarURL({dynamic : true , size : 4096})})
            .setThumbnail(message.guild.iconURL({dynamic :  true , size : 4096}))
            .setColor(client.greenColor())
            client.channels.cache.get(kanallar.voiceLog.transportChannel).send({embeds : [embed]})
        }else {
            var onayla = randomstring({length: 20});
            var reddet = randomstring({length: 20});
            const işlembaşarılı = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId(onayla)
                .setEmoji(emojiler.onay)
                .setLabel("Onayla")
                .setDisabled(true)
                .setStyle(3)
            )
            const işlemiptal = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId(reddet)
                .setEmoji(emojiler.red)
                .setLabel("Reddet")
                .setDisabled(true)
                .setStyle(4)
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId(onayla)
                .setEmoji(emojiler.onay)
                .setLabel("Onayla")
                .setStyle(3)
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId(reddet)
                .setEmoji(emojiler.red)
                .setLabel("Reddet")
                .setStyle(4)
            )

            const embed = new EmbedBuilder()
            .setAuthor({name : message.member.user.username , iconURL :  message.member.user.displayAvatarURL({dynamic : true , size : 4096})})
            .setDescription(`
             ${message.member} kullanıcısı seni yanına getirmek istiyor onaylıyor musun?,

             Onaylarsan gideceğin kanal : \`${message.member.voice.channel.name}\`
`)
            .setFooter({text :  üye.user.username , iconURL : üye.user.displayAvatarURL({dynamic : true , size : 4096})})
            .setThumbnail(üye.user.displayAvatarURL({dynamic :  true , size : 4096}))
            .setColor(client.greenColor())
            const msg = await message.reply({content : `${üye}`, embeds : [embed] ,components : [row]})


               
        const collector = message.channel.createMessageComponentCollector({ time: 30000 });

        collector.on('collect', async button => {
            if (button.customId === onayla) {
                if(button.member.id != üye.id) return
                const embed = new EmbedBuilder()
                .setAuthor({name : message.member.user.username , iconURL :  message.member.user.displayAvatarURL({dynamic : true , size : 4096})})
                .setDescription(`
                 ${message.member} İşlem onaylandı ${üye} kullanıcısın yanına gönderiliyorsun.`)
                .setFooter({text :  üye.user.username , iconURL : üye.user.displayAvatarURL({dynamic : true , size : 4096})})
                .setThumbnail(üye.user.displayAvatarURL({dynamic :  true , size : 4096}))
                .setColor(client.greenColor())


                button.reply({embeds : [embed],  ephemeral: true })
                message.member.voice.setChannel(üye.voice.channelId)

                const embed2 = new EmbedBuilder()
                .setAuthor({name : message.member.user.username , iconURL :  message.member.user.displayAvatarURL({dynamic : true , size : 4096})})
                .setDescription(`
                Bir **transport** işlemi gerçekleşti.
                
                Odaya getirilen kullanıcı : ${üye} - \`${üye.id}\`
                Odasına gidilen kişi : ${message.member} - \`${message.member.user.id}\`
                Kanal : <#${message.member.voice.channelId}>
                `)
                .setFooter({text :  üye.user.username , iconURL : üye.user.displayAvatarURL({dynamic : true , size : 4096})})
                .setThumbnail(message.guild.iconURL({dynamic :  true , size : 4096}))
                .setColor(client.greenColor())
                client.channels.cache.get(kanallar.voiceLog.transportChannel).send({embeds : [embed2]})

                msg.edit({components :  [işlembaşarılı]})
            }
            if (button.customId === reddet) {
                msg.edit({components :  [işlemiptal]})
                const embed = new EmbedBuilder()
                .setAuthor({name : message.member.user.username , iconURL :  message.member.user.displayAvatarURL({dynamic : true , size : 4096})})
                .setDescription(`
                 ${message.member} İşlem başarıyla reddedildi.`)
                .setFooter({text :  üye.user.username , iconURL : üye.user.displayAvatarURL({dynamic : true , size : 4096})})
                 .setColor(client.greenColor())


                button.reply({embeds : [embed],  ephemeral: true })
            }

        })
        }

       
    }}