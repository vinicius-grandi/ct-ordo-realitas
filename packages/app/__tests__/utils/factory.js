const { faker } = require('@faker-js/faker');
const { db } = require('../../firebase/serverApp');

const createRoom = async (amount = 1, name = '', type = null) => {
  try {
    db.useEmulator('127.0.0.1', 9000);
  } catch (_) {}

  let cloneName = name;

  let amountClone = amount;
  while (amountClone > 0) {
    const roomName = faker.word.adjective();
    const host = cloneName ?? faker.name.firstName();
    const games = ['devilCoffins', 'deathRooms', 'masqueradeBall'];
    const randomNumber = faker.datatype.number({
      min: 0,
      max: games.length - 1,
    });

    const players = {
      host,
    };

    if (type === 'devilCoffins') {
      Array.from(Array(3)).forEach(() => {
        players[faker.name.firstName()] = faker.name.firstName();
      });
    }

    await db.ref(`rooms/${roomName}`).set({
      room: roomName,
      host,
      gameType: type ?? games[randomNumber],
      players,
    });
    amountClone -= 1;
    cloneName = '';
  }
};

const fillRoom = async (room) => {
  try {
    db.useEmulator('127.0.0.1', 9000);
  } catch (_) {}
  const batchJoinRoom = async (amount = 1) => {
    const promiseJoinRoom = Array.from(Array(amount)).map(async () => {
      const name = faker.name.firstName();
      await db.ref(`/rooms/${room}/players`).update({
        [name]: name,
      });
    });
    await Promise.all(promiseJoinRoom);
  };
  const snapshot = await db.ref(`rooms/${room}`).get();
  const r = snapshot.val();
  switch (r.gameType) {
    case 'devilCoffins':
      await batchJoinRoom(4);
      break;
    case 'masqueradeBall':
      await batchJoinRoom(5);
      break;
    case 'deathRooms':
      await batchJoinRoom(5);
      break;
    default:
      return 'Something went wrong';
  }
};

module.exports.createRoom = createRoom;
module.exports.fillRoom = fillRoom;
