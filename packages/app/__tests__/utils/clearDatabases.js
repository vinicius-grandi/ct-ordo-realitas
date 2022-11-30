const { db } = require('../../firebase/serverApp');

async function clearDatabases() {
  try {
    db.useEmulator('127.0.0.1', 9000);
  } catch (_) {}
  return db.ref().root.remove();
}

module.exports = clearDatabases;
