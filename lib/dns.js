const dns = require('dns');

module.exports = function nresolve(name) {
  return new Promise((resolve, reject) => {
    dns.resolve(name, (err, records) => {
      if (err) {
        reject(err);
      }
      resolve(records);
    });
  });
};
