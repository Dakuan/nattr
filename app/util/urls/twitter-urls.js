function _sanitizeHandle(word) {
    // remove the @ 
    var res = word.slice(1, word.length)
        .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return res;
}

module.exports = {
    handleUrl: function (handle) {
        return 'https://twitter.com/' + _sanitizeHandle(handle);
    },
    hashTagUrl: function (word) {
        return "https://twitter.com/hashtag/" + word.slice(1, word.length);
    }
}
