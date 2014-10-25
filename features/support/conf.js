exports.config = {
    specs: [
        '../**/*.feature'
    ],
    seleniumServerJar: '../../selenium-server-standalone-2.44.0.jar',
    capabilities: {
        'browserName': 'phantomjs'
    },
    baseUrl: 'http://localhost:3000/',
    framework: 'cucumber'
}
