var app = require('./app');

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000');
});
