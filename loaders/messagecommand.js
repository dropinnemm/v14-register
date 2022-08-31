const { glob } = require ('glob'), { promisify } = require ('util'),{ green, red } = require ('chalk')

module.exports = async (client) => {
    const commandss = await promisify(glob)("./Commands/Message-Commands/*/*.js");
    commandss.map (value => {
        let file = require (`.${value}`)
        console.log(red(`[BOT] `)+ green(`${file.command.desc} Komutu başarıyla yüklendi.`))
        if (typeof file.command.name == 'string') return client.mcommands.set (file.command.name, file)
        if (file.command.name instanceof Array) return file.command.name.forEach (name => client.mcommands.set (name, file))
     
    })
  

}