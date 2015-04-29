Package.describe({
  name: 'loongmxbt:orion-lfs',
  version: '0.0.1',
  summary: 'Local storage for orion:filesystem',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:core@1.0.0',
    'orionjs:filesystem@1.0.0',
    'orionjs:config@1.0.0',
    'cfs:standard-packages',
    'cfs:filesystem',
    'underscore'
    ]);

  api.addFiles('orion-lfs.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:filesystem');
});
