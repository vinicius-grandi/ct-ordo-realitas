const { faker } = require('@faker-js/faker');
const { db } = require('../../firebase/serverApp');

const createRoom = async (amount = 1) => {
  try {
    db.useEmulator('127.0.0.1', 9000);
  } catch (_) {}

  let amountClone = amount;
  while (amountClone > 0) {
    const roomName = faker.word.adjective();
    const host = faker.name.firstName();

    await db.ref(`rooms/${roomName}`).set({
      room: roomName,
      host,
      gameType: '',
      players: {
        [host]: faker.name.firstName(),
      },
    });
    amountClone -= 1;
  }
};

module.exports.createRoom = createRoom;
