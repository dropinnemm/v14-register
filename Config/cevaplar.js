let config = require("./roller")
module.exports = {
    cevaplar : {
      "NotVoiceChannel" : `Bir ses kanalında bulunman gerek.`,
      "MemberNotVoiceChannel" : `Etiketlenen üye sesli kanalda değil.`,
      "SameVoiceChannel":"Zaten aynı kanaldasınız.",
      "NotMember":`Bir kullanıcı etiketle @undefinable/id.`,
      "NotNameAndAge":`Bir isim yaş belirtmelisin @undefinable/id isim yaş`,
      "YouYou":`Kendini işlem yapamazsın.`,
      "Manageable":`Bu kullanıcıya işlem yapamıyorum.`,
      "Highest":`Bu kullanıcı senden yüksekte yada eşit.`,
      "NotRegPerm":`Kayıt komutunu kullanmak için <@&${config.roller.RegPerm}> rolüne sahip olmalısın.`
      },
    
}