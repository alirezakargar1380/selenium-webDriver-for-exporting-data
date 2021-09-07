const stringify = require('fast-safe-stringify');

module.exports = obj => stringify(obj, null, '  ');
