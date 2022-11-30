const { auth } = require('../../firebase/serverApp');

module.exports = async function clearUsers() {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  const result = await auth.listUsers();
  const deleteUsers = result.users.map(async (user) => {
    await auth.deleteUser(user.uid);
  });
  await Promise.all(deleteUsers);
};
