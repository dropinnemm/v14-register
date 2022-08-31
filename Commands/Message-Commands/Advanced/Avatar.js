const {discord, EmbedBuilder,AttachmentBuilder } = require("discord.js")
module.exports = {
    command: {
        name: ["avatar","pp"],
        desc: "Avatar",
        category: "Kullanıcı",
    },
    async run({ client, message, args }) {
        let muser = message.mentions.users.first();
let userid;
if(isNaN(args[0])){if(!muser){userid = message.author.id;}else{userid = muser.id;}}else{userid = args[0];}
try{
let üye = await client.users.fetch(userid);
const attachment = new AttachmentBuilder(üye.displayAvatarURL({dynamic : true , size : 4096}));
message.reply({content : `${üye.tag} \`(${üye.id})\`` , files : [attachment]})
}catch {
    const embed = new EmbedBuilder()
.setDescription(`Kullanıcıyı bulamadım lüften geçerli bir kullanıcı idsi girin.`)
.setColor(client.redColor())
.setAuthor({name : message.member.user.username , iconURL : message.member.user.displayAvatarURL({dynamic : true , size : 4096})})
.setThumbnail(message.member.user.displayAvatarURL({dynamic : true , size : 4096}))
message.reply({embeds : [embed]})
    return
}}
}