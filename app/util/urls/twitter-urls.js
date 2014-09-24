function _sanitizeHandle(word) {
    // remove the @ 
    var res = word.slice(1, word.length);
    // remove a trailing colon for things like "RT @MostlyHarmlessD: hello!"
    if (res[res.length - 1] === ':') {
        res = res.slice(0, res.length - 1);
    }
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
