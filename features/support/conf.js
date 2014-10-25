exports.config = {
    specs: [
        '../**/*.feature'
    ],
    capabilities: {
        'browserName': 'phantomjs'
    },
    baseUrl: 'http://localhost:3000/',
    framework: 'cucumber'
}
