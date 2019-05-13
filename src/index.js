
var lng = process.argv[2];
var emj = require(`./emojis-${lng}.js`);

Object.entries(emj).forEach(element => {
    console.log(element[0]);
});
