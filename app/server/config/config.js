var nconf = require('nconf'),
    path = require('path');
    
nconf.argv()
    .env()
    .file({
    	file: path.join(__dirname, './', process.env.NODE_ENV + '.json')
    }).file({
    	file: path.join(__dirname, './secret.json')            	
    });

module.exports = nconf;
