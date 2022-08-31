new (require('./loaders/base.js'))().loader();


Array.prototype.random = function () {return this[Math.floor((Math.random()*this.length))]};
client.blue = {"color1": "#191970", "color2": "#000080", "color3": "#00008B", "color4": "#0000FF","color5": "#4169E1"}; client.blueColor = function () {return client.blue[Object.keys(client.blue).random()]}
client.pink = {"color1": "#FF69B4", "color2": "#FF1493", "color3": "#C71585", "color4": "#FF00FF","color5": "#F8A1E6"}; client.pinkColor = function () {return client.pink[Object.keys(client.pink).random()]}
client.orange = {"color1": "#FF4500", "color2": "#FF6347", "color3": "#FF7F50", "color4": "#FF9966","color5": "#FF6600"}; client.orangeColor = function () {return client.orange[Object.keys(client.orange).random()]}
client.green = {"color1": "#00FF00", "color2": "#7CFC00", "color3": "#7FFF00", "color4": "#00FF7F","color5": "#98FB98"}; client.greenColor = function () {return client.green[Object.keys(client.green).random()]}
client.red = {"color1": "#df0000", "color2": "#ea0000", "color3": "#f40000", "color4": "#ff1d0b","color5": "#fb0000"}; client.redColor = function () {return client.red[Object.keys(client.red).random()]}
client.random = {"color1": "#B7D7D8", "color2": "#FF8984", "color3": "#79A7A8", "color4": "#C9DFF1","color5": "#BAD6FD", "color6": "#A6C4E0", "color7" : "#FFFF9D"}; client.randomColor = function () {return client.random[Object.keys(client.random).random()]}


