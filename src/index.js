
const Mustache = require('mustache');
const fs = require('fs');
const lng = process.argv[2] || 'fr';
const emj = require(`./emojis-${lng}.js`);

const emojis = new Map();

function getInMap(map, key, lambda) {
    if (map.has(key)) {
        return map.get(key);
    }
    var value = lambda();
    map.set(key, value);
    return value;
}

function addToEmoji(emojis, emoji, text) {
    const texts = getInMap(emojis, emoji, () => []);
    texts.push(text);
    texts.sort();
}

Object.entries(emj).forEach(elements => {
    const text = elements[0].toString();
    for (let index = 0; index < elements[1].length; index++) {
        const emoji = elements[1][index];
        addToEmoji(emojis, emoji, text);
    }
});

var emojisAsc = new Map([...emojis.entries()].sort());
const resultEmojis = [];
emojisAsc.forEach((value, key, map) => {
    resultEmojis.push({ "value": key, "texts": value });
});
const result = { "lang": lng, "emojis": resultEmojis };

function render(templateFile, extension, view) {
    var template = fs.readFileSync(templateFile, 'utf8');
    var templatedView = Mustache.render(template, view);
    fs.writeFileSync(`result/emojis-${lng}.${extension}`, templatedView, 'utf8');
}

render('template.html', 'html', result);
render('template.md', 'md', result);

console.log('All done.');
