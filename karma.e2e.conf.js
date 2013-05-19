// Karma E2E configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'spec/angular/libs/mocks.js',
  'app/assets/javascripts/application.js',
  'spec/angular/e2e/sample_e2espec.js'
];

proxies = {
  // '/': 'http://localhost:3000/',
  '/' : 'http://localhost:3502/'
  // '/public/index.e2e.html' : 'http://localhost:3502/'
};

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress'];

autoWatch = true;
browsers = ['Chrome'];

// web server port
// port = 3000;

// cli runner port
// runnerPort = 3000;