const mongoose = require("mongoose");
const settings = require("../Config/settings");
const {red , green} = require("chalk");

mongoose.connect(settings.mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log(red(`[DATABASE] `)+ green(`Mongo urlsine başarıyla bağlanıldı.`))
       
});
mongoose.connection.on("error", () => {
  console.log(red(`[DATABASE HATA] Mongo urlsine bağlanılamadı.`))
});