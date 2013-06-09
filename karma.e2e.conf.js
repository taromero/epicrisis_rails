// Karma E2E configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'app/assets/components/underscore/underscore-min.js',
  'app/assets/javascripts/application.js',
  'spec/angular/mocks/mocks.js',
  'spec/angular/e2e/infeccion_e2e_spec.js'
];

proxies = {
  '/' : 'http://localhost:3502/'
};

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress'];

autoWatch = true;
browsers = ['Chrome'];
// browsers = ['PhantomJS'];

// web server port
// port = 3000;

// cli runner port
// runnerPort = 3000;