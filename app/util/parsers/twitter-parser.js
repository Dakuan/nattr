module.exports = {
    isHash: function (word) {
        return word[0] === '#' && word.length > 1;
    },

    isHandle: function (word) {
    	return word[0] === '@' && word.length > 1;
    }
};
