'use strict';

import through from 'through2';
import gutil from 'gulp-util';
import CfnValidator from 'cfn-validator';

const PLUGIN_NAME = 'gulp-cfn-validator';


module.exports = options => {
  const _options = Object.assign({}, {apiVersion: '2010-05-15'}, options);

  const cfnValidator = new CfnValidator(_options);

  const transform = (file, encoding, callback) => {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      callback(new gutil.PluginError(PLUGIN_NAME, 'streams not supported!'));
    }

    if (file.isBuffer()) {
      cfnValidator.validation(file.path, file.contents, encoding);
    }

    callback(null, file);
  };

  return through.obj(transform);
};
